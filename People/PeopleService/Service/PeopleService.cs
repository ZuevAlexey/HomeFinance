using System.Collections.Generic;
using System.Linq;
using JRPC.Service;
using MyCompany.Services.People.Contracts;
using MyCompany.Services.People.Contracts.Data;

namespace MyCompany.Services.People.Service.Service {
   /// <summary>
   /// Сервис для изменения инфомрации о людях - владельцах валютных ячеек
   /// </summary>
   internal class PeopleService : JRpcModule, IPeopleService {
      /// <summary>
      /// Получить людей по идентификаторам
      /// </summary>
      /// <param name="ids">Коллекция идентификаторов</param>
      /// <returns>Коллекция людей</returns>
      public ICollection<Person> GetPeople(IEnumerable<long> ids) {
         return ids.Select(id => new Person {
            Id = id
         }).ToList();
      }

      /// <summary>
      /// Обновить данные о людях
      /// </summary>
      /// <param name="people">Коллекция людей для сохранения</param>
      /// <returns>Коллекция идентификаторов для успешно сохраненных людей, для ошибочно сохраненных -1</returns>
      public ICollection<long> Upsert(IEnumerable<Person> people) {
         return people.Select(p => p.Id == default(long)
            ? -1
            : p.Id).ToList();
      }
   }
}