using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;
using System;
using System.Collections.Generic;

namespace MyCompany.Services.Entity.MoneyCells.Contracts.Data {
   /// <summary>
   /// ������ ����������
   /// </summary>
   public class TransactionFilter {
      /// <summary>
      /// �������������� ����������
      /// </summary>
      public ICollection<long> Ids { get; set; }

      /// <summary>
      /// �������������� �����-����������
      /// </summary>
      public ICollection<long> FromMoneyCellsIds {get;set;}

      /// <summary>
      /// �������������� �����-�����������
      /// </summary>
      public ICollection<long> ToMoneyCellsIds {get;set;}

      /// <summary>
      /// ����
      /// </summary>
      public ICollection<DateTime> Dates {get;set;}

      /// <summary>
      /// ���������� ����������
      /// </summary>
      public ICollection<TransactionResult> Results {get;set;}
   }
}
