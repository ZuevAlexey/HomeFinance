using System;

namespace MoneyCellsContracts.Seacrh {
   /// <summary>
   /// Период дат
   /// </summary>
   public class DatePeriod {
      /// <summary>
      /// Начало периода
      /// </summary>
      public DateTime StartDate { get; set; }

      /// <summary>
      /// Конец периода
      /// </summary>
      public DateTime EndDate { get; set; }

      public bool Contains(DateTime date) {
         return StartDate < date && date < EndDate;
      }
   }
}