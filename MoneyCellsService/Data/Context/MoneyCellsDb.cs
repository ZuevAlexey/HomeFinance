using LinqToDB;
using LinqToDB.Data;
using MyCompany.Services.MoneyCells.Service.Data.Entities;

namespace MyCompany.Services.MoneyCells.Service.Data.Context {
   /// <summary>
   /// Сущность БД MoneyCellsService
   /// </summary>
   public class MoneyCellsDb : DataConnection {
      public MoneyCellsDb() : base("MoneyCells") { }

      /// <summary>
      /// Таблица денежных ячеек
      /// </summary>
      public ITable<MoneyCellEntity> MoneyCells => GetTable<MoneyCellEntity>();

      /// <summary>
      /// Таблица транзакций
      /// </summary>
      public ITable<TransactionEntity> Transactions => GetTable<TransactionEntity>();
   }
}