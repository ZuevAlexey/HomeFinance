using System;
using System.Collections.Generic;
using System.Linq;
using MoneyCellsContracts.Seacrh;
using MoneyCellsService.Data.Entities;
using MoneyCellsService.Data.Providers;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;
using MyCompany.Services.Entity.MoneyCells.Contracts.Search;

namespace MoneyCellsService.Managers {
   public class TransactionManager : ITransactionManager {
      private readonly IMoneyCellsProvider _provider;

      public TransactionManager(IMoneyCellsProvider provider) {
         _provider = provider ?? throw new ArgumentNullException(nameof(provider));
      }

      /// <summary>
      /// Провести валютную транзакцию
      /// </summary>
      /// <param name="transaction">Сущность БД - транзакция для проведения</param>
      /// <returns>Отработанная транзакция, в случае системных ошибок null</returns>
      public void ProcessTransaction(TransactionEntity transaction) {
         if (!ValidateTransaction(transaction, out var fromMoneyCell, out var toMoneyCell)) {
            SaveTransaction(transaction, TransactionStatus.Fail);
            return;
         }

         fromMoneyCell.Balance = fromMoneyCell.Balance - transaction.Amount;
         toMoneyCell.Balance = toMoneyCell.Balance + transaction.Amount;
         var moneyCells = new List<MoneyCellEntity> {
            fromMoneyCell,
            toMoneyCell
         };
         if (_provider.UpsertMoneyCells(moneyCells).Contains(MoneyCellsProvider.INVALID_ID)) {
            SaveTransaction(transaction, TransactionStatus.Fail);
            return;
         }

         SaveTransaction(transaction, TransactionStatus.Success);
         return;
      }

      /// <summary>
      /// Сохранить транзакция
      /// </summary>
      /// <param name="transaction">Транзакция для сохранения</param>
      /// <param name="transactionStatus">Статус для сохранения</param>
      private void SaveTransaction(TransactionEntity transaction, TransactionStatus transactionStatus) {
         transaction.Status = (byte) transactionStatus;
         var upsertTransactionResult = _provider.UpsertTransaction(transaction);
         if (upsertTransactionResult == MoneyCellsProvider.INVALID_ID) {
            //TODO:логировать ошибку сохранения транзакции
         }
      }

      /// <summary>
      /// Проверка транзакции на валидность
      /// </summary>
      /// <param name="transaction">Транзакция для проверки</param>
      /// <param name="fromMoneyCell">Ячейка-отправитель</param>
      /// <param name="toMoneyCell">Ячейка-получатель</param>
      /// <returns></returns>
      private bool ValidateTransaction(TransactionEntity transaction, out MoneyCellEntity fromMoneyCell,
         out MoneyCellEntity toMoneyCell) {
         fromMoneyCell = null;
         toMoneyCell = null;
         if ((TransactionStatus) transaction.Status != TransactionStatus.Processing) {
            //TODO:логировать ошибку, т.к. менеджеру подсунули транзакцию не в состоянии TransactionStatus.Processing
            return false;
         }

         var transactionFilter = CreateTransactionFilter(transaction);
         var dbRow = _provider.GetTransactions(transactionFilter).FirstOrDefault();
         if (dbRow == null) {
            //TODO:логировать ошибку, т.к. менеджеру подсунули не существующую транзакцию
            return false;
         }

         fromMoneyCell = _provider.GetMoneyCell(CreateMoneyCellFilter(transaction.From)).FirstOrDefault();
         if (fromMoneyCell == null) {
            //TODO:логировать ошибку, т.к. не существует ячейки-источника
            return false;
         }

         toMoneyCell = _provider.GetMoneyCell(CreateMoneyCellFilter(transaction.To)).FirstOrDefault();
         if (toMoneyCell == null) {
            //TODO:логировать ошибку, т.к. не существует ячейки-получателя
            return false;
         }

         if (fromMoneyCell.CurrencyType != toMoneyCell.CurrencyType) {
            //TODO:логировать ошибку, т.к. ячейки-участники транзакции имеют разную валюту 
            return false;
         }

         if (fromMoneyCell.Balance < transaction.Amount) {
            //TODO:логировать ошибку, т.к. у ячейки-оправителя недостаточно средств 
            return false;
         }

         return true;
      }

      /// <summary>
      /// Построить фильтр по транзакции
      /// </summary>
      /// <param name="transaction">Сущность БД - транзакция</param>
      /// <returns>Фильтр транзакций</returns>
      internal TransactionFilter CreateTransactionFilter(TransactionEntity transaction) {
         return new TransactionFilter {
            Ids = new HashSet<long> {transaction.Id},
            Statuses = new HashSet<TransactionStatus> {(TransactionStatus) transaction.Status},
            FromMoneyCellsIds = new HashSet<long> {transaction.From},
            ToMoneyCellsIds = new HashSet<long> {transaction.To}
         };
      }

      /// <summary>
      /// Создать фильтр валютных ячеек по идентификатору
      /// </summary>
      /// <param name="id">Идентификатор валютной ячейки</param>
      /// <returns>Фильтр валютных ячеек</returns>
      private MoneyCellFilter CreateMoneyCellFilter(long id) {
         return new MoneyCellFilter {
            Ids = new HashSet<long> {id},
            Statuses = new HashSet<MoneyCellStatus> {MoneyCellStatus.Active}
         };
      }
   }
}