using System.Collections.Generic;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;

namespace MyCompany.Services.Entity.MoneyCells.Contracts.Search {
   /// <summary>
   /// ‘ильтр денежных €чеек
   /// </summary>
   public class MoneyCellFilter {
      /// <summary>
      /// »дентификаторы €чеек
      /// </summary>
      public HashSet<long> Ids { get; set; }

      /// <summary>
      /// »дентификаторы владельцев
      /// </summary>
      public HashSet<long> OwnersIds { get; set; }

      /// <summary>
      /// —татусы €чеек
      /// </summary>
      public HashSet<MoneyCellStatus> Statuses { get; set; }

      /// <summary>
      /// ѕризнак удалена ли €чейка. ѕо умолчанию не просматриваем удаленные €чейки
      /// </summary>
      public bool IsDeleted { get; set; } = false;
   }}