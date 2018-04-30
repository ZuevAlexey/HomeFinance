using System;
using System.Collections.Generic;
using System.Linq;
using JRPC.Service;
using LinqToDB;
using MoneyCellsService.Data.Context;
using MoneyCellsService.Data.Providers;
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
      private readonly IMoneyCellsProvider _provider;

      public MoneyCellsService(IMoneyCellsMapper mapper, IMoneyCellsProvider provider) {
         _mapper = mapper;
         _provider = provider;
      }

      /// <summary>
      /// Получить все денежных ячейки по фильтру
      /// </summary>
      /// <param name="filter">фильтр для поиска</param>
      /// <returns>Коллекция денежных ячеек</returns>
      public ICollection<MoneyCell> Get(MoneyCellFilter filter) {
         return filter == null
            ? null
            : _provider.Get(filter).Select(m => _mapper.MapToMoneyCell(m)).ToList();
      }

      /// <summary>
      /// Обновить данные для денежных ячеек
      /// </summary>
      /// <param name="moneyCells">Коллекция денежных ячеек для сохранения</param>
      /// <returns>Идентификаторы для успешно сохраненных банковских ячеек, для ошибок -1</returns>
      public ICollection<long> Upsert(IEnumerable<MoneyCell> moneyCells) {
         var cells = moneyCells as MoneyCell[] ?? moneyCells.ToArray();
         try {
            var moneyCellsEntities = cells.Select(m => _mapper.MapToMoneyCellEntity(m));
            return _provider.Upsert(moneyCellsEntities);
         } catch {
            //TODO: писать лог
            return cells.Select(m => MoneyCellsProvider.INVALID_ID).ToList();
         }
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
   }
}