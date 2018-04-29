using LinqToDB;
using LinqToDB.Data;
using MoneyCellsService.Data.Entities;

namespace MoneyCellsService.Data.Context {
   /// <summary>
   /// Сущность БД MoneyCellsService
   /// </summary>
   public class MoneyCellsDb : DataConnection {
      public MoneyCellsDb() : base("MoneyCells") { }

      /// <summary>
      /// Таблица денежных ячеек
      /// </summary>
      public ITable<MoneyCell> MoneyCells => GetTable<MoneyCell>();

      /// <summary>
      /// Таблица транзакций
      /// </summary>
      public ITable<Transaction> Transactions => GetTable<Transaction>();
   }
}
