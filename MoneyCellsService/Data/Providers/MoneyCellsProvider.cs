﻿using System.Collections.Generic;
using System.Linq;
using LinqToDB;
using MyCompany.Services.MoneyCells.Contracts.Enums;
using MyCompany.Services.MoneyCells.Contracts.Seacrh;
using MyCompany.Services.MoneyCells.Service.Data.Context;
using MyCompany.Services.MoneyCells.Service.Data.Entities;

namespace MyCompany.Services.MoneyCells.Service.Data.Providers {
   public class MoneyCellsProvider : IMoneyCellsProvider {
      public const long INVALID_ID = -1;

      /// <summary>
      /// Получить сущности бд - валютные ячейки по фильтру
      /// </summary>
      /// <param name="filter"></param>
      /// <returns></returns>
      public ICollection<MoneyCellEntity> GetMoneyCell(MoneyCellFilter filter) {
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

            return result.ToList();
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
                  var dbRow = db.MoneyCells.FirstOrDefault(m => m.Id == moneyCellEntity.Id);
                  if (dbRow == null) {
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
      public ICollection<TransactionEntity> GetTransactions(TransactionFilter filter) {
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

            return result.ToList();
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
   }
}