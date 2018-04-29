using JRPC.Client;
using MyCompany.Services.Entity.MoneyCells.Contracts;
using MyCompany.Services.Entity.MoneyCells.Contracts.Search;
using System;

namespace Sandbox {
   class Program {
      static void Main(string[] args) {
           var client = new JRpcClient();
            var proxy = client.GetProxy<IMoneyCellsService>("MoneyCellsService");
            var cell = proxy.Get(new MoneyCellFilter());

            Console.ReadLine();
      }
   }
}
