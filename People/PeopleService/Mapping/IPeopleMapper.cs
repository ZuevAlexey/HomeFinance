using MyCompany.Services.People.Contracts.Data;
using MyCompany.Services.People.Service.Data.Entities;

namespace MyCompany.Services.MoneyCells.Service.Mapping {
   /// <summary>
   /// Интерфейс маппер сущностей сервиса людей
   /// </summary>
   public interface IPeopleMapper {
      /// <summary>
      /// Сконвертировать объект типа <see cref="PersonEntity" /> в объект типа <see cref="Person" />
      /// </summary>
      /// <param name="personEntity">Сущность бд, представляющая человека</param>
      /// <returns>Человек</returns>
      Person MapToPerson(PersonEntity personEntity);

      /// <summary>
      /// Сконвертировать объект типа <see cref="Person" /> в объект типа <see cref="PersonEntity" />
      /// </summary>
      /// <param name="person">Человек</param>
      /// <returns>Сущность бд, представляющая человека</returns>
      PersonEntity MapToPersonEntity(Person person);
   }
}