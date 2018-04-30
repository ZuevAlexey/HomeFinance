using System.Collections.Generic;
using System.Linq;
using LinqToDB;
using MoneyCellsService.Data.Context;
using MoneyCellsService.Data.Entities;
using MyCompany.Services.Entity.MoneyCells.Contracts.Search;

namespace MoneyCellsService.Data.Providers {
   public class MoneyCellsProvider:IMoneyCellsProvider {
      public const long INVALID_ID = -1;
      /// <summary>
      /// Получить сущности бд - валютные ячейки по фильтру
      /// </summary>
      /// <param name="filter"></param>
      /// <returns></returns>
      public ICollection<MoneyCellEntity> Get(MoneyCellFilter filter) {
         throw new System.NotImplementedException();
      }

      /// <summary>
      /// Обновить данные денежных ячеек в БД
      /// </summary>
      /// <param name="moneyCellsEntities">Коллекция валютных ячеек - сущностей бд</param>
      /// <returns>Идентификаторы для успешно сохраненных банковских ячеек, для ошибок -1</returns>
      public ICollection<long> Upsert(IEnumerable<MoneyCellEntity> moneyCellsEntities) {
         var result = new List<long>();
         using (var db = new MoneyCellsDb())
            foreach (var moneyCellEntity in moneyCellsEntities) {
               try {
                  var dbRow = db.MoneyCells.First(m => m.Id == moneyCellEntity.Id);
                  if (dbRow == null) {
                     var id = db.InsertWithInt64Identity(moneyCellEntity);
                     result.Add(id);
                     continue;
                  }

                  db.Update(moneyCellEntity);
                  result.Add(moneyCellEntity.Id);
               } catch {
                  //TODO:писать лог
                  result.Add(INVALID_ID);
               }
            }

         return result;
      }
   }
}