using System;
using MyCompany.Services.MoneyCells.Contracts.Enums;

namespace MyCompany.Services.MoneyCells.Contracts.Data {
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
      public Currency Currency { get; set; }

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

      /// <summary>
      /// Удалена
      /// </summary>
      public bool IsDeleted { get; set; }
   }
}