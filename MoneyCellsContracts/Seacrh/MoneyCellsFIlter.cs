using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;
using System.Collections.Generic;

namespace MyCompany.Services.Entity.MoneyCells.Contracts.Search {
   /// <summary>
   /// ������ �������� �����
   /// </summary>
   public class MoneyCellFilter {
      /// <summary>
      /// �������������� �����
      /// </summary>
      public ICollection<long> Ids { get; set; }

      /// <summary>
      /// �������������� ����������
      /// </summary>
      public ICollection<long> OwnersIds { get; set; }

      /// <summary>
      /// ������� �����
      /// </summary>
      public ICollection<MoneyCellStatus> Statuses { get;set;}
   }
}