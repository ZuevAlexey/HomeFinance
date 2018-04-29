using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;
using System;

namespace MyCompany.Services.Entity.MoneyCells.Contracts.Data {
   /// <summary>
   /// Транзакция
   /// </summary>
   public class Transaction {
      /// <summary>
      /// Идентификатор
      /// </summary>
      public long Id { get; set; }

      /// <summary>
      /// Ячейка-источник
      /// </summary>
      public MoneyCell From {get;set;}

      /// <summary>
      /// Ячейка-получатель
      /// </summary>
      public MoneyCell To {get;set;}

      /// <summary>
      /// Размер
      /// </summary>
      public float Amount {get;set;}

      /// <summary>
      /// Дата
      /// </summary>
      public DateTime Date {get;set;}

      /// <summary>
      /// Результат
      /// </summary>
      public TransactionStatus Status {get;set;}
   }
}
