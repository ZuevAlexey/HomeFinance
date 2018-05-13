using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using MyCompany.Services.MoneyCells.Service.Mapping;
using MyCompany.Services.People.Contracts.Data;
using MyCompany.Services.People.Service.Data.Entities;

namespace MyCompany.Services.People.Service.Mapping {
   /// <summary>
   /// Класс - преобразователь сущностей сервиса PeopleService
   /// </summary>
   internal class PeopleMapper : IPeopleMapper {
      public PeopleMapper() {
         Initialyze();
      }

      /// <summary>
      /// Сконвертировать объект типа <see cref="PersonEntity" /> в объект типа <see cref="Person" />
      /// </summary>
      /// <param name="personEntity">Сущность бд, представляющая человека</param>
      /// <returns>Человек</returns>
      public Person MapToPerson(PersonEntity personEntity) {
         return Mapper.Map<Person>(personEntity);
      }

      /// <summary>
      /// Сконвертировать объект типа <see cref="Person" /> в объект типа <see cref="PersonEntity" />
      /// </summary>
      /// <param name="person">Человек</param>
      /// <returns>Сущность бд, представляющая человека</returns>
      public PersonEntity MapToPersonEntity(Person person) {
         return Mapper.Map<PersonEntity>(person);
      }

      private static void Initialyze() {
         Mapper.Initialize(e => {
            e.CreateMap<Person, PersonEntity>();
            e.CreateMap<PersonEntity, Person>();
         });

         Mapper.AssertConfigurationIsValid();
      }
   }
}
