using System.Transactions;
using MyCompany.Services.Groups.Contracts.Data;
using MyCompany.Services.Groups.Service.Data.Entities;

namespace MyCompany.Services.Groups.Service.Mapping {
   /// <summary>
   /// Интерфейс маппера сущностей сервиса группировок
   /// </summary>
   public interface IGroupMapper {
      /// <summary>
      /// Сконвертировать объект типа <see cref="Group" /> в объект типа <see cref="GroupEntity" />
      /// </summary>
      /// <param name="groupEntity">Сущность бд, представляющая группу</param>
      /// <returns>Группа</returns>
      Group MapToGroup(GroupEntity groupEntity);

      /// <summary>
      /// Сконвертировать объект типа <see cref="GroupEntity" /> в объект типа <see cref="Group" />
      /// </summary>
      /// <param name="group">Группа</param>
      /// <returns>Сущность бд, представляющая группу</returns>
      GroupEntity MapToGroupEntity(Group group);
   }
}
