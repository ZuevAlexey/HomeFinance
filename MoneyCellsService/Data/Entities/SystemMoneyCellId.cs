using LinqToDB.Mapping;

namespace MyCompany.Services.MoneyCells.Service.Data.Entities {
   [Table("SystemMoneyCellIds")]
   public class SystemMoneyCellId {
      [PrimaryKey]
      public int Currency { get; set; }

      [Column, NotNull]
      public long MoneyCellId { get; set; }
   }
}