using System.Collections.Generic;
using System.Linq;
using MyCompany.Services.Groups.Service.Data.Entities;
using MyCompany.Services.Groups.Service.Data.Provider;

namespace Sandbox.Group {
   internal static class GroupTest {
      internal static void Run() {
         var provider = new GroupProvider();
         var group = CreateEmptyGroup("first");
         var groups = GetGroups();
         var res = provider.UpsertGroups(groups);

         var result = provider.GetGroups(new long[] {1}).ToList();
      }

      private static GroupEntity CreateEmptyGroup(string name) {
         return new GroupEntity {Name = name};
      }

      private static IEnumerable<GroupEntity> GetGroups() {
         var group = new GroupEntity {
            Name = "Second"
         };
         var children = new List<ChildEntity> {
            new ChildEntity {
               Id = 1,
               GroupId = group.Id
            },
            new ChildEntity {
               Id = 2,
               GroupId = group.Id
            },
            new ChildEntity {
               Id = 3,
               GroupId = group.Id
            }
         };
         group.Children = children;

         return new[] {group};
      }
   }
}