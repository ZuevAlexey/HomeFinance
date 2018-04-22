using System.Collections.Generic;

namespace MyCompany.Services.Entity.Core {
   public interface IEntityService<TEntity,TEntityData,TEntityId> {
      IList<TEntity> GetAll();
      TEntity GetOne(TEntityId id);
      IList<TEntity> GetRange(IEnumerable<TEntityId> ids);
      IList<TEntity> AddRange(IEnumerable<TEntityData> moneyCellsData);
      bool ChangeData(TEntityId personId,TEntityData personData);
      IDictionary<TEntityId, TEntityId> TryRemove(IEnumerable<TEntityId> ids);
   }
}
