using System;
using System.Collections.Generic;
using System.Linq;
using JRPC.Service;
using MyCompany.Services.MoneyCells.Service.Mapping;
using MyCompany.Services.People.Contracts;
using MyCompany.Services.People.Contracts.Data;
using MyCompany.Services.People.Service.Data.Provider;
using Ninject.Infrastructure.Language;

namespace MyCompany.Services.People.Service.Service {
   /// <summary>
   /// Сервис для изменения инфомрации о людях - владельцах валютных ячеек
   /// </summary>
   internal class PeopleService : JRpcModule, IPeopleService {
      private IPeopleProvider _provider;
      private IPeopleMapper _mapper;

      public PeopleService(IPeopleProvider provider, IPeopleMapper mapper) {
         _provider = provider;
         _mapper = mapper;
      }

      /// <summary>
      /// Получить людей по идентификаторам
      /// </summary>
      /// <param name="ids">Коллекция идентификаторов</param>
      /// <returns>Коллекция людей</returns>
      public ICollection<Person> GetPeople(IEnumerable<long> ids) {
         try {
            return _provider.GetPeople(ids).Select(p => _mapper.MapToPerson(p)).ToList();
         } catch (Exception ex) {
            //TODO: логировать ошибку
            return null;
         }
      }

      /// <summary>
      /// Обновить данные о людях
      /// </summary>
      /// <param name="people">Коллекция людей для сохранения</param>
      /// <returns>Коллекция идентификаторов для успешно сохраненных людей, для ошибочно сохраненных -1</returns>
      public ICollection<long> Upsert(IEnumerable<Person> people) {
         try {
            return _provider.Upsert(people.Select(p => _mapper.MapToPersonEntity(p)));
         } catch (Exception ex) {
            //TODO: логировать ошибку
            return null;
         }
      }
   }
}