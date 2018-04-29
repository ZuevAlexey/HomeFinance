using JRPC.Service;
using MyCompany.Services.Entity.MoneyCells.Contracts;
using MyCompany.Services.Entity.MoneyCells.Contracts.Data;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;
using MyCompany.Services.Entity.MoneyCells.Contracts.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyCellsService.Service {
   public class MoneyCellsService : JRpcModule, IMoneyCellsService {
      public ICollection<MoneyCell> Get(MoneyCellFilter filter) {
         return new List<MoneyCell> { new MoneyCell{
            Balance=40,
            CreationDate=DateTime.Now,
            CurrencyType=CurrencyType.RUB,
            Id=1,
            Name="В кошельке",
            OwnerId=1,
            Status=MoneyCellStatus.Active,
            Type=MoneyCellType.Сash} };
      }

      public ICollection<Transaction> GetTransactions(TransactionFilter filter) {
         throw new NotImplementedException();
      }

      public Transaction ProcessTransaction(long fromMoneyCell, long toMoneyCell, float amount) {
         throw new NotImplementedException();
      }

      public ICollection<long> Upsert(ICollection<MoneyCell> moneyCells) {
         throw new NotImplementedException();
      }
   }
}
