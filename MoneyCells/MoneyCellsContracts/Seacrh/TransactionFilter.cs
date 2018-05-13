using System.Collections.Generic;
using MyCompany.Services.MoneyCells.Contracts.Enums;

namespace MyCompany.Services.MoneyCells.Contracts.Seacrh {
   /// <summary>
   /// ������ ����������
   /// </summary>
   public class TransactionFilter {
      /// <summary>
      /// �������������� ����������
      /// </summary>
      public HashSet<long> Ids { get; set; }

      /// <summary>
      /// �������������� �����-����������
      /// </summary>
      public HashSet<long> FromMoneyCellsIds { get; set; }

      /// <summary>
      /// �������������� �����-�����������
      /// </summary>
      public HashSet<long> ToMoneyCellsIds { get; set; }

      /// <summary>
      /// ������ ���
      /// </summary>
      public DateRange Range { get; set; }

      /// <summary>
      /// ���������� ����������
      /// </summary>
      public HashSet<TransactionStatus> Statuses { get; set; }
   }
}