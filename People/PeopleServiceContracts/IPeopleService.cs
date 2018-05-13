using System.Collections.Generic;
using MyCompany.Services.People.Contracts.Data;

namespace MyCompany.Services.People.Contracts {
   /// <summary>
   /// Интерфейс для работы с сервисом людей
   /// </summary>
   public interface IPeopleService {
      /// <summary>
      /// Получить людей по идентификаторам
      /// </summary>
      /// <param name="ids">Коллекция идентификаторов</param>
      /// <returns>Коллекция людей</returns>
      ICollection<Person> GetPeople(IEnumerable<long> ids);

      /// <summary>
      /// Обновить данные о людях
      /// </summary>
      /// <param name="people">Коллекция людей для сохранения</param>
      /// <returns>Коллекция идентификаторов для успешно сохраненных людей, для ошибочно сохраненных -1</returns>
      ICollection<long> Upsert(IEnumerable<Person> people);
   }
}