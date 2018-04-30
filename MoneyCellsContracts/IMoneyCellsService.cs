using System.Collections.Generic;
using MyCompany.Services.Entity.MoneyCells.Contracts.Data;
using MyCompany.Services.Entity.MoneyCells.Contracts.Search;

namespace MyCompany.Services.Entity.MoneyCells.Contracts {
   /// <summary>
   /// Интерфейс сервиса денежных ячеек
   /// </summary>
   public interface IMoneyCellsService {
      /// <summary>
      /// Получить все денежных ячейки по фильтру
      /// </summary>
      /// <param name="filter">фильтр для поиска</param>
      /// <returns>Коллекция денежных ячеек</returns>
      ICollection<MoneyCell> Get(MoneyCellFilter filter);

      /// <summary>
      /// Обновить данные для денежных ячеек
      /// </summary>
      /// <param name="moneyCells">Коллекция денежных ячеек для сохранения</param>
      /// <returns>Идентификаторы для успешно сохраненных банковских ячеек, для ошибок -1</returns>
      ICollection<long> Upsert(IEnumerable<MoneyCell> moneyCells);

      /// <summary>
      /// Провести транзакцию
      /// </summary>
      /// <param name="fromMoneyCell">Ячейка-источник денежных средств</param>
      /// <param name="toMoneyCell">Ячейка-получатель денежных средств</param>
      /// <param name="amount">Размер транзакции</param>
      /// <returns>Транзакция</returns>
      Transaction ProcessTransaction(long fromMoneyCell, long toMoneyCell, float amount);

      /// <summary>
      /// Получить транзакции по фильтру
      /// </summary>
      /// <param name="filter">Фильтр транзакций</param>
      /// <returns>Транзакции</returns>
      ICollection<Transaction> GetTransactions(TransactionFilter filter);
   }
}