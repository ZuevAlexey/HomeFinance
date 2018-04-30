using System;
using System.Collections.Generic;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;

namespace MyCompany.Services.Entity.MoneyCells.Contracts.Data {
   /// <summary>
   /// Фильтр транзакций
   /// </summary>
   public class TransactionFilter {
      /// <summary>
      /// Идентификаторы транзакций
      /// </summary>
      public HashSet<long> Ids { get; set; }

      /// <summary>
      /// Идентификаторы ячеек-источников
      /// </summary>
      public HashSet<long> FromMoneyCellsIds { get; set; }

      /// <summary>
      /// Идентификаторы ячеек-получателей
      /// </summary>
      public HashSet<long> ToMoneyCellsIds { get; set; }

      /// <summary>
      /// Даты
      /// </summary>
      public HashSet<DateTime> Dates { get; set; }

      /// <summary>
      /// Результаты транзакций
      /// </summary>
      public HashSet<TransactionStatus> Results { get; set; }
   }
}