using LinqToDB.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyCellsService.Data {
   /// <summary>
   /// Объект-сущность СУБД, представляющий валютрую транзакцию
   /// </summary>
   [Table("Transactions")]
   public class Transaction {
      /// <summary>
      /// Идентификатор
      /// </summary>
      [PrimaryKey,Identity]
      public long Id { get; set; }

      /// <summary>
      /// Идентификатор ячейки-источника
      /// </summary>
      [Column,NotNull]
      public long From {get;set;}

      /// <summary>
      /// Идентификатор ячейки-получателя
      /// </summary>
      [Column,NotNull]
      public long To {get;set;}

      /// <summary>
      /// Размер
      /// </summary>
      [Column,NotNull]
      public float Amount {get;set;}

      /// <summary>
      /// Дата
      /// </summary>
      [Column,NotNull]
      public DateTime Date {get;set;}

      /// <summary>
      /// Результат
      /// </summary>
      [Column,NotNull]
      public byte Status {get;set;}
   }
}
