using System.Collections.Generic;
using MyCompany.Services.MoneyCells.Contracts.Seacrh;
using MyCompany.Services.MoneyCells.Service.Data.Entities;

namespace MyCompany.Services.MoneyCells.Service.Data.Providers {
   /// <summary>
   /// Провайдер валютных ячеек и транзакций
   /// </summary>
   public interface IMoneyCellsProvider {
      /// <summary>
      /// Получить сущности бд - валютные ячейки по фильтру
      /// </summary>
      /// <param name="filter"></param>
      /// <returns></returns>
      ICollection<MoneyCellEntity> GetMoneyCell(MoneyCellFilter filter);

      /// <summary>
      /// Обновить данные денежных ячеек в БД
      /// </summary>
      /// <param name="moneyCellsEntities">Коллекция валютных ячеек - сущностей бд</param>
      /// <returns>Идентификаторы для успешно сохраненных банковских ячеек, для ошибок -1</returns>
      ICollection<long> UpsertMoneyCells(IEnumerable<MoneyCellEntity> moneyCellsEntities);

      /// <summary>
      /// Получить сущности БД - транзакции
      /// </summary>
      /// <param name="filter">Фильтр, по которому выбираются транзакции</param>
      /// <returns>Коллекция транзакций, удовлетворяющих фильтру</returns>
      ICollection<TransactionEntity> GetTransactions(TransactionFilter filter);

      /// <summary>
      /// Сохранить транзакцию
      /// </summary>
      /// <param name="transactionEntity">Сущность БД - транзакция</param>
      /// <returns>Идентификатор транзакции в случае успеха, иначе -1</returns>
      long UpsertTransaction(TransactionEntity transactionEntity);
   }
}