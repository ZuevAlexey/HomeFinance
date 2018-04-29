using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;
using System;

namespace MyCompany.Services.Entity.MoneyCells.Contracts.Data {
   /// <summary>
   /// ����������
   /// </summary>
   public class Transaction {
      /// <summary>
      /// �������������
      /// </summary>
      public long Id { get; set; }

      /// <summary>
      /// ������-��������
      /// </summary>
      public MoneyCell From {get;set;}

      /// <summary>
      /// ������-����������
      /// </summary>
      public MoneyCell To {get;set;}

      /// <summary>
      /// ������
      /// </summary>
      public float Amount {get;set;}

      /// <summary>
      /// ����
      /// </summary>
      public DateTime Date {get;set;}

      /// <summary>
      /// ���������
      /// </summary>
      public TransactionStatus Status {get;set;}
   }
}
