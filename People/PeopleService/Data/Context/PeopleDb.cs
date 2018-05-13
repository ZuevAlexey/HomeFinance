using LinqToDB;
using LinqToDB.Data;
using MyCompany.Services.People.Service.Data.Entities;

namespace MyCompany.Services.People.Service.Data.Context {
   internal class PeopleDb : DataConnection {
      internal PeopleDb() : base("People") { }

      /// <summary>
      /// Таблица людей
      /// </summary>
      public ITable<PersonEntity> People => GetTable<PersonEntity>();
   }
}