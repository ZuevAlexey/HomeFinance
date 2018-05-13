using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LinqToDB.Mapping;

namespace MyCompany.Services.People.Service.Data.Entities {
   /// <summary>
   /// Сущность бд, представляющаа человека
   /// </summary>
   [Table("People")]
   public class PersonEntity {
      /// <summary>
      /// Идентификатор
      /// </summary>
      [PrimaryKey, Identity]
      public long Id { get; set; }

      /// <summary>
      /// Фамилия
      /// </summary>
      [Column,NotNull]
      public string FirstName { get; set; }

      /// <summary>
      /// Имя
      /// </summary>
      [Column,NotNull]
      public string LastName { get; set; }

      /// <summary>
      /// Отчетство
      /// </summary>
      [Column]
      public string MiddleName { get; set; }

      /// <summary>
      /// Дата рождения
      /// </summary>
      [Column,NotNull]
      public DateTime BirthDate { get; set; }
   }
}
