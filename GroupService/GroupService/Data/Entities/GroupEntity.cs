using System.Collections.Generic;
using LinqToDB.Mapping;

namespace MyCompany.Services.Groups.Service.Data.Entities {
   /// <summary>
   /// Сущность бд, представляющая группу
   /// </summary>
   [Table("Groups")]
   public class GroupEntity {
      /// <summary>
      /// Идентификатор
      /// </summary>
      [PrimaryKey, Identity]
      public int Id { get; set; }

      /// <summary>
      /// Имя группы
      /// </summary>
      [Column, NotNull]
      public string Name { get; set; }

      /// <summary>
      /// Список дочерних элементов группы
      /// </summary>
      [Association(ThisKey = "Id", OtherKey = "GroupId", CanBeNull = true)]
      public IEnumerable<ChildEntity> Children { get; set; }
   }
}