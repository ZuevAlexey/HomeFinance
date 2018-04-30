using System;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;

namespace MyCompany.Services.Entity.MoneyCells.Contracts.Data {
   /// <summary>
   /// Денежная ячейка
   /// </summary>
   public class MoneyCell {
      /// <summary>
      /// Идентификатор
      /// </summary>
      public long Id { get; set; }

      /// <summary>
      /// Идентификатор владельца
      /// </summary>
      public long OwnerId { get; set; }

      /// <summary>
      /// Дата создания
      /// </summary>
      public DateTime CreationDate { get; set; }

      /// <summary>
      /// Тип
      /// </summary>
      public MoneyCellType Type { get; set; }

      /// <summary>
      /// Тип валюты
      /// </summary>
      public CurrencyType CurrencyType { get; set; }

      /// <summary>
      /// Баланс
      /// </summary>
      public float Balance { get; set; }

      /// <summary>
      /// Статус
      /// </summary>
      public MoneyCellStatus Status { get; set; }

      /// <summary>
      /// Имя
      /// </summary>
      public string Name { get; set; }
   }
}