using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyCompany.Services.Entity.MoneyCells;
using MyCompany.Services.Entity.MoneyCells.Contracts.Data;
using MyCompany.Services.Entity.People.Contracts.Data;

namespace MyCompany.Services.Managers.People.Contracts {
   public interface IPeopleManager {
      ICollection<Person> GetAllPeople();
      ICollection<Person> GetPeople(IEnumerable<long> ids);
      Person GetPerson(long id);
      ICollection<MoneyCell> Upsert(IEnumerable<MoneyCell> moneyCells);
   }
}
