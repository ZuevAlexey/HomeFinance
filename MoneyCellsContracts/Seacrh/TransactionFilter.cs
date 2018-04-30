using System;
using System.Collections.Generic;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;

namespace MyCompany.Services.Entity.MoneyCells.Contracts.Data {
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
      /// ����
      /// </summary>
      public HashSet<DateTime> Dates { get; set; }

      /// <summary>
      /// ���������� ����������
      /// </summary>
      public HashSet<TransactionStatus> Results { get; set; }
   }
}