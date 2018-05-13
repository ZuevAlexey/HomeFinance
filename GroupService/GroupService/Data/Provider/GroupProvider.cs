using System;
using System.Collections.Generic;
using System.Linq;
using LinqToDB;
using MyCompany.Services.Groups.Service.Data.Context;
using MyCompany.Services.Groups.Service.Data.Entities;

namespace MyCompany.Services.Groups.Service.Data.Provider {
   /// <inheritdoc />
   internal class GroupProvider : IGroupProvider {
      private const int INVALID_ID = -1;

      /// <inheritdoc />
      public ICollection<long> UpsertGroups(IEnumerable<GroupEntity> groups) {
         var result = new List<long>();
         using (var db = new GroupDb()) {
            foreach (var group in groups) {
               try {
                  if (group.Id == default(long)) {
                     result.Add(db.InsertWithInt64Identity(group));
                     continue;
                  }

                  db.Update(group);
                  result.Add(group.Id);
               } catch (Exception ex) {
                  //TODO: логировать ошибку
                  result.Add(INVALID_ID);
               }
            }
         }

         return result;
      }

      /// <inheritdoc />
      public IEnumerable<GroupEntity> GetGroups(IEnumerable<long> ids) {
         using (var db = new GroupDb()) {
            return db.Groups.LoadWith(g => g.Children).Where(p => ids.Contains(p.Id));
         }
      }

      /// <inheritdoc />
      public ICollection<bool> AddInGroup(long groupId, IEnumerable<long> objectsIds) {
         var result = new List<bool>();
         using (var db = new GroupDb()) {
            var group = GetGroupById(db, groupId);
            var children = new HashSet<ChildEntity>(group.Children);
            foreach (var objectId in objectsIds) {
               var childEntry = new ChildEntity {Id = objectId, GroupId = group.Id};
               if (children.Contains(childEntry)) {
                  result.Add(false);
               } else {
                  children.Add(childEntry);
                  result.Add(true);
               }
            }

            if (result.Contains(true)) {
               group.Children = children;
               db.Update(group);
            }
         }

         return result;
      }

      /// <inheritdoc />
      public ICollection<bool> RemoveFromGroup(long groupId, IEnumerable<long> objectsIds) {
         throw new NotImplementedException();
      }

      /// <inheritdoc />
      public ICollection<long> GetGroupList(long groupId) {
         throw new NotImplementedException();
      }

      private GroupEntity GetGroupById(GroupDb context, long groupId) {
         return context.Groups.LoadWith(g => g.Children).FirstOrDefault(g => g.Id == groupId);
      }
   }
}