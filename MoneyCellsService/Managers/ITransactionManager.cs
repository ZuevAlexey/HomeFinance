using MoneyCellsService.Data.Entities;

namespace MoneyCellsService.Managers {
   /// <summary>
   /// Интерфейс менеджера транзакций
   /// </summary>
   public interface ITransactionManager {
      /// <summary>
      /// Провести валютную транзакцию
      /// </summary>
      /// <param name="transaction">Сущность БД - транзакция для проведения</param>
      /// <returns>Отработанная транзакция, в случае системных ошибок null</returns>
      TransactionEntity ProcessTransaction(TransactionEntity transaction);
   }
}