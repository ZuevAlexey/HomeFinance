using System;
using System.Collections.Generic;
using JRPC.Service;
using MyCompany.Services.Groups.Contracts;
using MyCompany.Services.Groups.Contracts.Data;

namespace MyCompany.Services.Groups.Service.Service {
   /// <summary>
   /// Сервис группировок
   /// </summary>
   internal class GroupService : JRpcModule, IGroupService {
      /// <summary>
      /// Обновить данные о группах
      /// </summary>
      /// <param name="groups">Колекция групп, которых нужно обновить</param>
      /// <returns>Содержит идентификаторы для успешно обновленных записей и -1 для ошибочных</returns>
      public ICollection<long> UpsertGroups(IEnumerable<Group> groups) {
         try {
            throw new System.NotImplementedException();
         } catch (Exception ex) {
            //TODO:логировать ошибку
            return null;
         }
      }

      /// <summary>
      /// Получить группы по идентификаторам
      /// </summary>
      /// <param name="ids">Идентификаторы искомых групп</param>
      /// <returns>Коллекция найденных групп</returns>
      public ICollection<Group> GetGroups(IEnumerable<long> ids) {
         try {
            throw new System.NotImplementedException();
         } catch (Exception ex) {
            //TODO:логировать ошибку
            return null;
         }
      }

      /// <summary>
      /// Добавить объекты в группу
      /// </summary>
      /// <param name="groupId">Идентификатор группы, в которую добавляем объекты</param>
      /// <param name="objectsIds">Идентификаторы добавляемых объектов</param>
      /// <returns>Коллекция, содержащая true - для успешно добавленного объекта (либо уже в группе состоявшего), false - в случае ошибки добавления</returns>
      public ICollection<bool> AddInGroup(long groupId, IEnumerable<long> objectsIds) {
         try {
            throw new System.NotImplementedException();
         } catch (Exception ex) {
            //TODO:логировать ошибку
            return null;
         }
      }

      /// <summary>
      /// Исключить объекты из группы
      /// </summary>
      /// <param name="groupId">Идентификатор группы, из которой исключаем объекты</param>
      /// <param name="objectsIds">Идентификаторы исключаемых объектов</param>
      /// <returns>Коллекция, содержащая true - для успешно исключенного объекта (либо уже в группе не состоявшего), false - в случае ошибки исключения</returns>
      public ICollection<bool> RemoveFromGroup(long groupId, IEnumerable<long> objectsIds) {
         try {
            throw new System.NotImplementedException();
         } catch (Exception ex) {
            //TODO:логировать ошибку
            return null;
         }
      }

      /// <summary>
      /// Получить членов группы по идентификатору группы
      /// </summary>
      /// <param name="groupId">Идентификатор группы</param>
      /// <returns>Список идентификаторов объектов, входящих в группу</returns>
      public ICollection<long> GetGroupList(long groupId) {
         try {
            throw new System.NotImplementedException();
         } catch (Exception ex) {
            //TODO:логировать ошибку
            return null;
         }
      }
   }
}