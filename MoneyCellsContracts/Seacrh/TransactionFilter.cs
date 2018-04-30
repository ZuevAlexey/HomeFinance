using System;
using System.Collections.Generic;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;

namespace MoneyCellsContracts.Seacrh {
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
      public DatePeriod Period { get; set; }

      /// <summary>
      /// ���������� ����������
      /// </summary>
      public HashSet<TransactionStatus> Statuses { get; set; }
   }
}