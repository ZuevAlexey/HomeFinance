using System;
using MyCompany.Services.MoneyCells.Contracts.Enums;

namespace MyCompany.Services.MoneyCells.Contracts.Data {
   /// <summary>
   /// ����������
   /// </summary>
   public class Transaction {
      /// <summary>
      /// �������������
      /// </summary>
      public long Id { get; set; }

      /// <summary>
      /// ������������� ������-���������
      /// </summary>
      public long From { get; set; }

      /// <summary>
      /// ������������� ������-����������
      /// </summary>
      public long To { get; set; }

      /// <summary>
      /// ������
      /// </summary>
      public float Amount { get; set; }

      /// <summary>
      /// ����
      /// </summary>
      public DateTime Date { get; set; }

      /// <summary>
      /// ���������
      /// </summary>
      public TransactionStatus Status { get; set; }
   }
}