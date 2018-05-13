using System;
using System.Collections.Generic;
using System.Linq;
using LinqToDB;
using MyCompany.Services.MoneyCells.Contracts.Enums;
using MyCompany.Services.MoneyCells.Contracts.Seacrh;
using MyCompany.Services.MoneyCells.Service.Data.Context;
using MyCompany.Services.MoneyCells.Service.Data.Entities;

namespace MyCompany.Services.MoneyCells.Service.Data.Providers {
   /// <summary>
   /// Класс провайдера данных о валютных ячейках
   /// </summary>
   public class MoneyCellsProvider : IMoneyCellsProvider {
      public const long INVALID_ID = -1;

      /// <summary>
      /// Получить сущности бд - валютные ячейки по фильтру
      /// </summary>
      /// <param name="filter"></param>
      /// <returns></returns>
      public IEnumerable<MoneyCellEntity> GetMoneyCell(MoneyCellFilter filter) {
         using (var db = new MoneyCellsDb()) {
            var result = db.MoneyCells.Where(m => m.IsDeleted == filter.IsDeleted);
            if (filter.Ids != null) {
               result = result.Where(m => filter.Ids.Contains(m.Id));
            }

            if (filter.OwnersIds != null) {
               result = result.Where(m => filter.OwnersIds.Contains(m.OwnerId));
            }

            if (filter.Statuses != null) {
               result = result.Where(m => filter.Statuses.Contains((MoneyCellStatus) m.Status));
            }

            return result;
         }
      }

      /// <summary>
      /// Обновить данные денежных ячеек в БД
      /// </summary>
      /// <param name="moneyCellsEntities">Коллекция валютных ячеек - сущностей бд</param>
      /// <returns>Идентификаторы для успешно сохраненных банковских ячеек, для ошибок -1</returns>
      public ICollection<long> UpsertMoneyCells(IEnumerable<MoneyCellEntity> moneyCellsEntities) {
         var result = new List<long>();
         using (var db = new MoneyCellsDb())
            foreach (var moneyCellEntity in moneyCellsEntities) {
               try {
                  if (moneyCellEntity.Id == default(long)) {
                     var id = db.InsertWithInt64Identity(moneyCellEntity);
                     result.Add(id);
                     continue;
                  }

                  db.Update(moneyCellEntity);
                  result.Add(moneyCellEntity.Id);
               } catch {
                  //TODO:писать лог
                  result.Add(INVALID_ID);
               }
            }

         return result;
      }

      /// <summary>
      /// Получить сущности БД - транзакции
      /// </summary>
      /// <param name="filter">Фильтр, по которому выбираются транзакции</param>
      /// <returns>Коллекция транзакций, удовлетворяющих фильтру</returns>
      public IEnumerable<TransactionEntity> GetTransactions(TransactionFilter filter) {
         using (var db = new MoneyCellsDb()) {
            var result = (IQueryable<TransactionEntity>) db.Transactions;
            if (filter.Ids != null) {
               result = result.Where(t => filter.Ids.Contains(t.Id));
            }

            if (filter.Statuses != null) {
               result = result.Where(t => filter.Statuses.Contains((TransactionStatus) t.Status));
            }

            if (filter.Range != null) {
               result = result.Where(t => filter.Range.Contains(t.Date));
            }

            if (filter.FromMoneyCellsIds != null) {
               result = result.Where(t => filter.FromMoneyCellsIds.Contains(t.From));
            }

            if (filter.ToMoneyCellsIds != null) {
               result = result.Where(t => filter.ToMoneyCellsIds.Contains(t.To));
            }

            return result;
         }
      }

      /// <summary>
      /// Сохранить транзакцию
      /// </summary>
      /// <param name="transactionEntity">Сущность БД - транзакция</param>
      /// <returns>Идентификатор транзакции в случае успеха, иначе -1</returns>
      public long UpsertTransaction(TransactionEntity transactionEntity) {
         using (var db = new MoneyCellsDb())
            try {
               var dbRow = db.Transactions.FirstOrDefault(m => m.Id == transactionEntity.Id);
               if (dbRow == null) {
                  return db.InsertWithInt64Identity(transactionEntity);
               }

               db.Update(transactionEntity);
               return transactionEntity.Id;
            } catch {
               //TODO:писать лог
               return INVALID_ID;
            }
      }

      /// <summary>
      /// Получить системную ячейку по типу валюты <see cref="Currency" />>
      /// </summary>
      /// <param name="currency">Тип валюты</param>
      /// <returns>Системная валютная ячейка</returns>
      public MoneyCellEntity GetSystemMoneyCell(byte currency) {
         var systemId = GetSystemMoneyCellId(currency);
         return GetMoneyCell(new MoneyCellFilter {Ids = new HashSet<long> {systemId}}).FirstOrDefault();
      }

      private long GetSystemMoneyCellId(byte currency) {
         using (var db = new MoneyCellsDb()) {
            var systemMoneyCellId = db.SystemMoneyCellIds.FirstOrDefault(s => s.Currency == currency);
            if (systemMoneyCellId != null) {
               systemMoneyCellId = ValidateSystemMoneyCell(systemMoneyCellId, currency);
               return systemMoneyCellId.MoneyCellId;
            }

            var moneyCell = CreateSystemMoneyCell(currency);

            systemMoneyCellId = new SystemMoneyCellId {
               Currency = currency,
               MoneyCellId = moneyCell.Id
            };

            db.Insert(systemMoneyCellId);

            return systemMoneyCellId.MoneyCellId;
         }
      }

      private MoneyCellEntity CreateSystemMoneyCell(byte currency) {
         var systemMoneyCell = new MoneyCellEntity {
            Status = (byte) MoneyCellStatus.Active,
            Balance = GetDefaultMoneyCellBalance(),
            CreationDate = DateTime.Now,
            CurrencyType = currency,
            IsDeleted = false,
            Name = $"System{Enum.GetName(typeof(Currency), currency)}",
            OwnerId = 0,
            Type = (byte) MoneyCellType.Card
         };

         var moneyCellId = UpsertMoneyCells(new List<MoneyCellEntity> {systemMoneyCell}).FirstOrDefault();
         systemMoneyCell.Id = moneyCellId;
         return systemMoneyCell;
      }

      private SystemMoneyCellId ValidateSystemMoneyCell(SystemMoneyCellId systemMoneyCellId, byte currency) {
         var moneyCell = GetMoneyCell(new MoneyCellFilter {Ids = new HashSet<long> {systemMoneyCellId.MoneyCellId}})
            .FirstOrDefault();

         using (var db = new MoneyCellsDb()) {
            if (moneyCell == null || moneyCell.CurrencyType != currency) {
               var newMoneyCell = CreateSystemMoneyCell(currency);
               systemMoneyCellId.MoneyCellId = newMoneyCell.Id;

               db.Update(systemMoneyCellId);
            } else {
               moneyCell.Balance = GetDefaultMoneyCellBalance();
               db.Update(moneyCell);
            }
         }

         return systemMoneyCellId;
      }

      private float GetDefaultMoneyCellBalance() {
         return float.MaxValue / 2;
      }
   }
}