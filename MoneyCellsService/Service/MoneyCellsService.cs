using System;
using System.Collections.Generic;
using System.Linq;
using JRPC.Service;
using MyCompany.Services.MoneyCells.Contracts;
using MyCompany.Services.MoneyCells.Contracts.Data;
using MyCompany.Services.MoneyCells.Contracts.Enums;
using MyCompany.Services.MoneyCells.Contracts.Seacrh;
using MyCompany.Services.MoneyCells.Service.Data.Entities;
using MyCompany.Services.MoneyCells.Service.Data.Providers;
using MyCompany.Services.MoneyCells.Service.Managers;
using MyCompany.Services.MoneyCells.Service.Mapping;

namespace MyCompany.Services.MoneyCells.Service.Service {
   /// <summary>
   /// Сервис валютных ячеек
   /// </summary>
   public class MoneyCellsService : JRpcModule, IMoneyCellsService {
      private readonly IMoneyCellsMapper _mapper;
      private readonly IMoneyCellsProvider _provider;
      private readonly ITransactionManager _transactionManager;

      public MoneyCellsService(IMoneyCellsMapper mapper, IMoneyCellsProvider provider, ITransactionManager transactionManager) {
         _mapper = mapper;
         _provider = provider;
         _transactionManager = transactionManager;
      }

      /// <summary>
      /// Получить все денежных ячейки по фильтру
      /// </summary>
      /// <param name="filter">фильтр для поиска</param>
      /// <returns>Коллекция денежных ячеек</returns>
      public ICollection<MoneyCell> Get(MoneyCellFilter filter) {
         return filter == null
            ? null
            : _provider.GetMoneyCell(filter).Select(m => _mapper.MapToMoneyCell(m)).ToList();
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
            return _provider.UpsertMoneyCells(moneyCellsEntities);
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
         return _provider.GetTransactions(filter).Select(t => _mapper.MapToTransaction(t)).ToList();
      }

      /// <summary>
      /// Провести транзакцию
      /// </summary>
      /// <param name="fromMoneyCell">Ячейка-источник денежных средств</param>
      /// <param name="toMoneyCell">Ячейка-получатель денежных средств</param>
      /// <param name="amount">Размер транзакции</param>
      /// <returns>Транзакция</returns>
      public Transaction ProcessTransaction(long fromMoneyCell, long toMoneyCell, float amount) {
         var transaction = new TransactionEntity {
            From = fromMoneyCell,
            To = toMoneyCell,
            Amount = amount,
            Date = DateTime.Now,
            Status = (byte)TransactionStatus.Processing
         };

         transaction.Id = _provider.UpsertTransaction(transaction);
         if (transaction.Id != MoneyCellsProvider.INVALID_ID) {
            _transactionManager.ProcessTransaction(transaction);
         }
         return _mapper.MapToTransaction(transaction);
      }
   }
}