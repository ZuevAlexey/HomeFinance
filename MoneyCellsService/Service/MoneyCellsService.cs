using System;
using System.Collections.Generic;
using JRPC.Service;
using LinqToDB;
using MoneyCellsService.Data.Context;
using MoneyCellsService.Mapping;
using MyCompany.Services.Entity.MoneyCells.Contracts;
using MyCompany.Services.Entity.MoneyCells.Contracts.Data;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;
using MyCompany.Services.Entity.MoneyCells.Contracts.Search;

namespace MoneyCellsService.Service {
   /// <summary>
   /// Сервис валютных ячеек
   /// </summary>
   public class MoneyCellsService : JRpcModule, IMoneyCellsService {
      private readonly IMoneyCellsMapper _mapper;

      public MoneyCellsService(IMoneyCellsMapper mapper) {
         _mapper = mapper;
      }

      /// <summary>
      /// Получить все денежных ячейки по фильтру
      /// </summary>
      /// <param name="filter">фильтр для поиска</param>
      /// <returns>Коллекция денежных ячеек</returns>
      public ICollection<MoneyCell> Get(MoneyCellFilter filter) {
         return new List<MoneyCell> {
            new MoneyCell {
               Balance = 40,
               CreationDate = DateTime.Now,
               CurrencyType = CurrencyType.RUB,
               Id = 1,
               Name = "В кошельке",
               OwnerId = 1,
               Status = MoneyCellStatus.Active,
               Type = MoneyCellType.Сash
            }
         };
      }

      /// <summary>
      /// Получить транзакции по фильтру
      /// </summary>
      /// <param name="filter">Фильтр транзакций</param>
      /// <returns>Транзакции</returns>
      public ICollection<Transaction> GetTransactions(TransactionFilter filter) {
         throw new NotImplementedException();
      }

      /// <summary>
      /// Провести транзакцию
      /// </summary>
      /// <param name="fromMoneyCell">Ячейка-источник денежных средств</param>
      /// <param name="toMoneyCell">Ячейка-получатель денежных средств</param>
      /// <param name="amount">Размер транзакции</param>
      /// <returns>Транзакция</returns>
      public Transaction ProcessTransaction(long fromMoneyCell, long toMoneyCell, float amount) {
         throw new NotImplementedException();
      }


      /// ///
      /// <summary>
      /// Обновить данные для денежных ячеек
      /// </summary>
      /// <param name="moneyCells">Коллекция денежных ячеек для сохранения</param>
      /// <returns>Идентификаторы для успешно сохраненных банковских ячеек, для ошибок -1</returns>
      public ICollection<long> Upsert(ICollection<MoneyCell> moneyCells) {
         const int INVALID_ID = -1;
         var result = new List<long>();
         using (var db = new MoneyCellsDb()) {
            foreach (var moneyCell in moneyCells) {
               try {
                  var entity = _mapper.MapToMoneyCellEntity(moneyCell);
                  var id = db.InsertWithInt64Identity(entity);
                  result.Add(id);
               } catch (Exception ex) {
                  Console.WriteLine(ex);
                  result.Add(INVALID_ID);
               }
            }
         }

         return result;
      }
   }
}