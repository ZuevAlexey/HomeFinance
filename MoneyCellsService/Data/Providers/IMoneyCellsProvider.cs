using System.Collections.Generic;
using MoneyCellsService.Data.Entities;
using MyCompany.Services.Entity.MoneyCells.Contracts.Search;

namespace MoneyCellsService.Data.Providers {
   /// <summary>
   /// Провайдер валютных ячеек и транзакций
   /// </summary>
   public interface IMoneyCellsProvider {
      /// <summary>
      /// Получить сущности бд - валютные ячейки по фильтру
      /// </summary>
      /// <param name="filter"></param>
      /// <returns></returns>
      ICollection<MoneyCellEntity> Get(MoneyCellFilter filter);

      /// <summary>
      /// Обновить данные денежных ячеек в БД
      /// </summary>
      /// <param name="moneyCellsEntities">Коллекция валютных ячеек - сущностей бд</param>
      /// <returns>Идентификаторы для успешно сохраненных банковских ячеек, для ошибок -1</returns>
      ICollection<long> Upsert(IEnumerable<MoneyCellEntity> moneyCellsEntities);
   }
}