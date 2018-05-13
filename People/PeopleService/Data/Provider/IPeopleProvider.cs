using System.Collections.Generic;
using MyCompany.Services.People.Service.Data.Entities;

namespace MyCompany.Services.People.Service.Data.Provider {
   /// <summary>
   /// Интерфейс провайдера людей-объектов бд
   /// </summary>
   internal interface IPeopleProvider {
      /// <summary>
      /// Получить людей-объектов бд по идентификаторам
      /// </summary>
      /// <param name="ids">Коллекция идентификаторов</param>
      /// <returns>Коллекция людей-объектов бд</returns>
      ICollection<PersonEntity> GetPeople(IEnumerable<long> ids);

      /// <summary>
      /// Обновить данные о людях-объектах бд
      /// </summary>
      /// <param name="people">Коллекция людей-объектов бд для сохранения</param>
      /// <returns>Коллекция идентификаторов для успешно сохраненных людей-объектов бд, для ошибочно сохраненных -1</returns>
      ICollection<long> Upsert(IEnumerable<PersonEntity> people);
   }
}
