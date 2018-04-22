using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyCompany.Services.Entity.People.Contracts.Data;
using MyCompany.Services.Entity.People.Contracts;
using MyCompany.Services.Managers.People.Contracts;
using MyCompany.Services.Entity.MoneyCells.Contracts;
using MyCompany.Services.Entity.MoneyCells.Contracts.Data;

namespace MyCompany.Services.Managers.People {
   public class PeopleManagerService : IPeopleManager {
      private IPeopleService _peopleService;
      private IMoneyCellsService _moneyCellsService;

      public IPeopleService PeopleService { 
         get {
            return _peopleService;
            } 
         }
      public IMoneyCellsService MoneyCellsService { 
         get 
            { 
            return _moneyCellsService; 
            } 
         }


      public PeopleManagerService(IPeopleService peopleService, IMoneyCellsService moneyCellsService) {
         _peopleService = peopleService;
         _moneyCellsService = moneyCellsService;
      }

      public IList<Person> GetAllPeople() {
         return _peopleService.GetAll();
      }

      public IList<Person> GetPeople(IEnumerable<long> ids) {
         return _peopleService.GetRange(ids);
      }

      public Person GetPerson(long personId) {
         return _peopleService.GetOne(personId);
      }

      public IList<MoneyCell> CreateMoneyCell(IEnumerable<MoneyCellData> moneyCellsData) {
         return _moneyCellsService.AddRange(moneyCellsData);
      }
   }
}
