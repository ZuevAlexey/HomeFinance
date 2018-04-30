using System;
using System.Collections.Generic;
using JRPC.Client;
using MyCompany.Services.Entity.MoneyCells.Contracts;
using MyCompany.Services.Entity.MoneyCells.Contracts.Data;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;

namespace Sandbox {
   class Program {
      static void Main(string[] args) {
         var client = new JRpcClient("http://127.0.0.1:15555");
         var proxy = client.GetProxy<IMoneyCellsService>("MoneyCellsService");
         var insert = new List<MoneyCell> {
            new MoneyCell {
               Balance = 40,
               CreationDate = DateTime.Now,
               CurrencyType = CurrencyType.RUB,
               Name = "Кошелек",
               OwnerId = 3,
               Status = MoneyCellStatus.Active,
               Type = MoneyCellType.Сash
            }
         };

         var result = proxy.Upsert(insert);

         Console.ReadLine();
      }
   }
}