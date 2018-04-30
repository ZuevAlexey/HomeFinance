using System.Collections.Generic;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;

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
      public ICollection<MoneyCellStatus> Statuses { get; set; }
   }
}