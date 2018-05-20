﻿using System;
using LinqToDB.Mapping;

namespace MyCompany.Services.MoneyCells.Service.Data.Entities {
   /// <summary>
   /// Объект-сущность СУБД, представляющий денежную ячейку
   /// </summary>
   [Table("MoneyCells")]
   public class MoneyCellEntity {
      /// <summary>
      /// Идентификатор
      /// </summary>
      [PrimaryKey, Identity]
      public long Id { get; set; }

      /// <summary>
      /// Идентификатор владельца
      /// </summary>
      [Column, NotNull]
      public long OwnerId { get; set; }

      /// <summary>
      /// Дата создания
      /// </summary>
      [Column, NotNull]
      public DateTime CreationDate { get; set; }

      /// <summary>
      /// Тип
      /// </summary>
      [Column, NotNull]
      public byte Type { get; set; }

      /// <summary>
      /// Тип валюты
      /// </summary>
      [Column, NotNull]
      public byte CurrencyType { get; set; }

      /// <summary>
      /// Баланс
      /// </summary>
      [Column, NotNull]
      public float Balance { get; set; }

      /// <summary>
      /// Статус
      /// </summary>
      [Column, NotNull]
      public byte Status { get; set; }

      /// <summary>
      /// Имя
      /// </summary>
      [Column, NotNull]
      public string Name { get; set; }

      /// <summary>
      /// Удалена
      /// </summary>
      [Column,NotNull]
      public bool IsDeleted { get; set; }
   }
}