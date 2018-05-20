using LinqToDB.Mapping;

namespace MyCompany.Services.Groups.Service.Data.Entities {
   /// <summary>
   /// Сущность бд, отражающая члена группы
   /// </summary>
   [Table("Children")]
   public class ChildEntity {
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

      /// <summary>Determines whether the specified object is equal to the current object.</summary>
      /// <param name="obj">The object to compare with the current object. </param>
      /// <returns>true if the specified object  is equal to the current object; otherwise, false.</returns>
      public override bool Equals(object obj) {
         if (!(obj is ChildEntity otherChild)) {
            return false;
         }

         return Id == otherChild.Id
                && GroupId == otherChild.GroupId;
      }

      /// <summary>Serves as the default hash function. </summary>
      /// <returns>A hash code for the current object.</returns>
      public override int GetHashCode() => Id.GetHashCode() ^ GroupId.GetHashCode();
   }
}