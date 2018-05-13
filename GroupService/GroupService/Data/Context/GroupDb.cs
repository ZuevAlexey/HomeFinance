using LinqToDB;
using LinqToDB.Data;
using MyCompany.Services.Groups.Service.Data.Entities;

namespace MyCompany.Services.Groups.Service.Data.Context {
   internal class GroupDb : DataConnection {
      internal GroupDb() : base("Groups") { }

      /// <summary>
      /// Таблица групп
      /// </summary>
      public ITable<GroupEntity> People => GetTable<GroupEntity>();
   }
}