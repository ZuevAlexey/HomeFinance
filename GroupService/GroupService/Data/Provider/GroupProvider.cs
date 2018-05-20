using System;
using System.Collections.Generic;
using System.Linq;
using LinqToDB;
using MyCompany.Services.Groups.Service.Data.Context;
using MyCompany.Services.Groups.Service.Data.Entities;

namespace MyCompany.Services.Groups.Service.Data.Provider {
   /// <inheritdoc />
   public class GroupProvider : IGroupProvider {
      private const int INVALID_ID = -1;

      public GroupProvider() {
         LinqToDB.Common.Configuration.Linq.AllowMultipleQuery=true;
      }

      /// <inheritdoc />
      public ICollection<long> UpsertGroups(IEnumerable<GroupEntity> groups) {
         var result = new List<long>();
         using (var db = new GroupDb()) {
            foreach (var group in groups) {
               try {
                  if (group.Id == default(long)) {
                     var groupId = db.InsertWithInt64Identity(group);
                     AddInGroup(groupId, group.Children.Select(c => c.Id), db);
                     result.Add(groupId);
                     continue;
                  }

                  db.Update(group);
                  ActualizationChildren(db, group);

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
            return db.Groups.LoadWith(g => g.Children).Where(p => ids.Contains(p.Id)).ToList();
         }
      }

      /// <inheritdoc />
      public ICollection<bool> AddInGroup(long groupId, IEnumerable<long> childrenIds) {
         using (var db = new GroupDb()) {
            return AddInGroup(groupId, childrenIds, db);
         }
      }

      /// <inheritdoc />
      public ICollection<bool> RemoveFromGroup(long groupId, IEnumerable<long> childrenIds) {
         var result = new List<bool>();
         using (var db = new GroupDb()) {
            foreach (var childId in childrenIds) {
               try {
                  var deleteCount = db.Children.Where(c => c.Id == childId && c.GroupId == groupId).Delete();
                  result.Add(deleteCount == 1);
               } catch (Exception ex) {
                  //TODO:логировать ошибку
                  result.Add(false);
               }
            }
         }

         return result;
      }

      /// <inheritdoc />
      public ICollection<long> GetGroupList(long groupId) {
         using (var db = new GroupDb()) {
            return GetGroupById(db, groupId).Children.Select(c => c.Id).ToList();
         }
      }

      private static GroupEntity GetGroupById(GroupDb db, long groupId) {
         return db.Groups.LoadWith(g => g.Children).FirstOrDefault(g => g.Id == groupId);
      }

      private void ActualizationChildren(GroupDb db, GroupEntity group) {
         var actualChildren = group.Children.Select(c => c.Id).ToList();
         var childrenFromDb = GetGroupList(group.Id);
         var childToAdd = actualChildren.Except(childrenFromDb);
         var childToRemove = childrenFromDb.Except(actualChildren);
         db.Children.Where(c => c.GroupId==group.Id && childToRemove.Contains(c.Id)).Delete();
         AddInGroup(group.Id, childToAdd, db);
      }

      private static ICollection<bool> AddInGroup(long groupId, IEnumerable<long> childrenIds, GroupDb db) {
         var result = new List<bool>();
         var childIds = new HashSet<long>(db.Children.Where(c => c.GroupId == groupId).Select(c => c.Id));
         foreach (var childId in childrenIds) {
            if (childIds.Contains(childId)) {
               result.Add(false);
            } else {
               db.Insert(new ChildEntity {Id = childId, GroupId = groupId});
               result.Add(true);
            }
         }

         return result;
      }
   }
}