using System.Collections.Generic;
using System.Linq;
using JRPC.Client;
using MyCompany.Services.Groups.Contracts;

namespace Sandbox.Group {
   internal static class GroupTest {
      internal static void Run() {
         var proxy = JRpcClient.Create<IGroupService>("http://localhost:16500");
         var groups = GetGroups();

         var res = proxy.UpsertGroups(groups);
         var list = proxy.GetGroupList(2);
         var addResult = proxy.AddInGroup(3, new long[] {2, 6, 8});
         var removeResult = proxy.RemoveFromGroup(2, new long[] {2, 6, 8});
         var allGroups = proxy.GetGroups(new long[] {1, 2, 3, 4, 5, 6}).ToList();
      }

      private static IEnumerable<MyCompany.Services.Groups.Contracts.Data.Group> GetGroups() {
         var group = new MyCompany.Services.Groups.Contracts.Data.Group {
            Name = "Second",
            Children = new HashSet<long>(new long[] {1, 2})
         };

         return new[] {group};
      }
   }
}