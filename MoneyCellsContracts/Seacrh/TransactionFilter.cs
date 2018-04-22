using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;
using System;
using System.Collections.Generic;

namespace MyCompany.Services.Entity.MoneyCells.Contracts.Data {
   /// <summary>
   /// Фильтр транзакций
   /// </summary>
   public class TransactionFilter {
      /// <summary>
      /// Идентификаторы транзакций
      /// </summary>
      public ICollection<long> Ids { get; set; }

      /// <summary>
      /// Идентификаторы ячеек-источников
      /// </summary>
      public ICollection<long> FromMoneyCellsIds {get;set;}

      /// <summary>
      /// Идентификаторы ячеек-получателей
      /// </summary>
      public ICollection<long> ToMoneyCellsIds {get;set;}

      /// <summary>
      /// Даты
      /// </summary>
      public ICollection<DateTime> Dates {get;set;}

      /// <summary>
      /// Результаты транзакций
      /// </summary>
      public ICollection<TransactionResult> Results {get;set;}
   }
}
