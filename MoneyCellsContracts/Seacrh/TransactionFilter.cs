using System.Collections.Generic;
using MyCompany.Services.MoneyCells.Contracts.Enums;

namespace MyCompany.Services.MoneyCells.Contracts.Seacrh {
   /// <summary>
   /// ‘ильтр транзакций
   /// </summary>
   public class TransactionFilter {
      /// <summary>
      /// »дентификаторы транзакций
      /// </summary>
      public HashSet<long> Ids { get; set; }

      /// <summary>
      /// »дентификаторы €чеек-источников
      /// </summary>
      public HashSet<long> FromMoneyCellsIds { get; set; }

      /// <summary>
      /// »дентификаторы €чеек-получателей
      /// </summary>
      public HashSet<long> ToMoneyCellsIds { get; set; }

      /// <summary>
      /// ѕериод дат
      /// </summary>
      public DateRange Range { get; set; }

      /// <summary>
      /// –езультаты транзакций
      /// </summary>
      public HashSet<TransactionStatus> Statuses { get; set; }
   }
}