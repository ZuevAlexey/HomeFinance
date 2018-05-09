using System.Collections.Generic;

namespace MyCompany.Services.Groups.Contracts.Data {
   /// <summary>
   /// Класс представляющий группу объектов
   /// </summary>
   public class Group {
      /// <summary>
      /// Идентификатор группы
      /// </summary>
      public long Id { get; set;}

      /// <summary>
      /// Имя группы
      /// </summary>
      public string Name { get;set;}

      /// <summary>
      /// Идентификаторы членов группы
      /// </summary>
      public HashSet<long> Children{ get;set;}
   }
}
