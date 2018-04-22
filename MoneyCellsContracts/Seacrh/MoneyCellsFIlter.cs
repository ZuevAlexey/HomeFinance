using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;
using System.Collections.Generic;

namespace MyCompany.Services.Entity.MoneyCells.Contracts.Search {
   /// <summary>
   /// ‘ильтр денежных €чеек
   /// </summary>
   public class MoneyCellFilter {
      /// <summary>
      /// »дентификаторы €чеек
      /// </summary>
      public ICollection<long> Ids { get; set; }

      /// <summary>
      /// »дентификаторы владельцев
      /// </summary>
      public ICollection<long> OwnersIds { get; set; }

      /// <summary>
      /// —татусы €чеек
      /// </summary>
      public ICollection<MoneyCellStatus> Statuses { get;set;}
   }
}