using System;
using System.Collections.Generic;
using System.Linq;
using LinqToDB;
using MyCompany.Services.People.Service.Data.Context;
using MyCompany.Services.People.Service.Data.Entities;

namespace MyCompany.Services.People.Service.Data.Provider {
   /// <summary>
   /// Класс провайдера данных о людях
   /// </summary>
   internal class PeopleProvider : IPeopleProvider {
      public const int INVALID_ID = -1;

      /// <summary>
      /// Получить людей-объектов бд по идентификаторам
      /// </summary>
      /// <param name="ids">Коллекция идентификаторов</param>
      /// <returns>Коллекция людей-объектов бд</returns>
      public ICollection<PersonEntity> GetPeople(IEnumerable<long> ids) {
         using (var db = new PeopleDb()) {
            return db.People.Where(p => ids.Contains(p.Id)).ToList();
         }
      }

      /// <summary>
      /// Обновить данные о людях-объектах бд
      /// </summary>
      /// <param name="people">Коллекция людей-объектов бд для сохранения</param>
      /// <returns>Коллекция идентификаторов для успешно сохраненных людей-объектов бд, для ошибочно сохраненных -1</returns>
      public ICollection<long> Upsert(IEnumerable<PersonEntity> people) {
         var result = new List<long>();
         using (var db = new PeopleDb()) {
            foreach (var person in people) {
               try {
                  if (person.Id == default(long)) {
                     result.Add(db.InsertWithInt64Identity(person));
                  } else {
                     db.Update(person);
                     result.Add(person.Id);
                  }
               } catch (Exception ex) {
                  //TODO: писать лог
                  result.Add(INVALID_ID);
               }
            }
         }

         return result;
      }
   }
}