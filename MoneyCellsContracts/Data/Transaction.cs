using System;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;

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
      /// Идентификатор ячейки-источника
      /// </summary>
      public long From { get; set; }

      /// <summary>
      /// Идентификатор ячейки-получателя
      /// </summary>
      public long To { get; set; }

      /// <summary>
      /// Размер
      /// </summary>
      public float Amount { get; set; }

      /// <summary>
      /// Дата
      /// </summary>
      public DateTime Date { get; set; }

      /// <summary>
      /// Результат
      /// </summary>
      public TransactionStatus Status { get; set; }
   }
}