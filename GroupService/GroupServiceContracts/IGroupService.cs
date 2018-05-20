﻿using System.Collections.Generic;
using MyCompany.Services.Groups.Contracts.Data;

namespace MyCompany.Services.Groups.Contracts {
   /// <summary>
   /// Интерфейс сервиса группировки
   /// </summary>
   public interface IGroupService {
      /// <summary>
      /// Обновить данные о группах
      /// </summary>
      /// <param name="groups">Колекция групп, которых нужно обновить</param>
      /// <returns>Содержит идентификаторы для успешно обновленных записей и -1 для ошибочных</returns>
      ICollection<long> UpsertGroups(IEnumerable<Group> groups);

      /// <summary>
      /// Получить группы по идентификаторам
      /// </summary>
      /// <param name="ids">Идентификаторы искомых групп</param>
      /// <returns>Коллекция найденных групп</returns>
      ICollection<Group> GetGroups(IEnumerable<long> ids);

      /// <summary>
      /// Добавить объекты в группу
      /// </summary>
      /// <param name="groupId">Идентификатор группы, в которую добавляем объекты</param>
      /// <param name="childrenIds">Идентификаторы добавляемых объектов</param>
      /// <returns>Коллекция, содержащая true - для успешно добавленного объекта (либо уже в группе состоявшего), false - в случае ошибки добавления</returns>
      ICollection<bool> AddInGroup(long groupId, IEnumerable<long> childrenIds);

      /// <summary>
      /// Исключить объекты из группы
      /// </summary>
      /// <param name="groupId">Идентификатор группы, из которой исключаем объекты</param>
      /// <param name="childrenIds">Идентификаторы исключаемых объектов</param>
      /// <returns>Коллекция, содержащая true - для успешно исключенного объекта (либо уже в группе не состоявшего), false - в случае ошибки исключения</returns>
      ICollection<bool> RemoveFromGroup(long groupId, IEnumerable<long> childrenIds);

      /// <summary>
      /// Получить членов группы по идентификатору группы
      /// </summary>
      /// <param name="groupId">Идентификатор группы</param>
      /// <returns>Список идентификаторов объектов, входящих в группу</returns>
      ICollection<long> GetGroupList(long groupId);
    }
}