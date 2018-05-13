using LinqToDB.Mapping;

namespace MyCompany.Services.Groups.Service.Data.Entities {
   /// <summary>
   /// Сущность бд, отражающая члена группы
   /// </summary>
   internal class ChildEntity {
      /// <summary>
      /// Идентификатор
      /// </summary>
      [Column, PrimaryKey(Order = 1)]
      public long Id { get; set; }

      /// <summary>
      /// Идентификатор группы
      /// </summary>
      [Column, PrimaryKey(Order = 2)]
      public long GroupId { get; set; }
   }
}