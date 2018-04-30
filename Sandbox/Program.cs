
using System;
using System.Collections.Generic;
using System.Text;
using JRPC.Client;
using MyCompany.Services.Entity.MoneyCells.Contracts;
using MyCompany.Services.Entity.MoneyCells.Contracts.Data;
using MyCompany.Services.Entity.MoneyCells.Contracts.Enums;
using MyCompany.Services.Entity.MoneyCells.Contracts.Search;

namespace Sandbox {
   class Program {
      static void Main(string[] args) {
         var client = new JRpcClient("http://127.0.0.1:15555");
         var proxy = client.GetProxy<IMoneyCellsService>("MoneyCellsService");

         //var cells = GetMoneyCells();

         //var result = proxy.Upsert(cells);

         //var filter = new MoneyCellFilter {
         //   Ids = new HashSet<long> { 1, 2 },
         //   IsDeleted = true,
         //   OwnersIds = null,
         //   Statuses = null
         //};

         //var result = proxy.Get(filter);

         Console.ReadKey();
      }

      private void TransactionTest(IMoneyCellsService moneyCellsService) {
         const string PRETTY_LINE = "*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*";
         while (true) {
            Console.WriteLine(PRETTY_LINE);
            Console.WriteLine("С какого счета будем списывать бабки?");
            if (!long.TryParse(Console.ReadLine(), out var fromId)) {
               Console.WriteLine("Идентификатор счета - целое число.");
               continue;
            }

            Console.WriteLine("На какой положим?");
            if (!long.TryParse(Console.ReadLine(), out var toId)) {
               Console.WriteLine("Идентификатор счета - целое число.");
               continue;
            }

            Console.WriteLine("Сколько?");
            if (!long.TryParse(Console.ReadLine(), out var amount)) {
               Console.WriteLine("Идентификатор счета - целое число.");
               continue;
            }
            Console.WriteLine(PRETTY_LINE);
            var transaction = moneyCellsService.ProcessTransaction(fromId, toId, amount);
            StringBuilder sb = new StringBuilder();
            sb.AppendLine(Environment.NewLine);
            sb.AppendLine("Данные о транзакции :");
            sb.AppendLine($"Идентификатор получателя : {transaction.To}");
            sb.AppendLine($"Идентификатор отправителя : {transaction.From}");
            sb.AppendLine($"Дата транзакции : {transaction.Date}");
            sb.AppendLine($"Сумма : {transaction.Amount}");
            sb.AppendLine($"Статус : {transaction.Status}");
            Console.WriteLine(sb.ToString());
            Console.WriteLine(PRETTY_LINE);
            Console.WriteLine("Еще разок (y/n)?");
            if (Console.ReadKey().Key == ConsoleKey.N) {
               break;
            }
         }
      }
      private static List<MoneyCell> GetMoneyCells() {
         var insert = new List<MoneyCell> {
            new MoneyCell {
               Balance = 1100,
               CreationDate = DateTime.Now,
               CurrencyType = CurrencyType.RUB,
               Name = "Кошелек",
               OwnerId = 1,
               Status = MoneyCellStatus.Active,
               Type = MoneyCellType.Сash,
               IsDeleted = false
            },
            new MoneyCell {
               Balance = 1,
               CreationDate = DateTime.Now,
               CurrencyType = CurrencyType.USD,
               Name = "Наташкина заначка",
               OwnerId = 2,
               Status = MoneyCellStatus.Active,
               Type = MoneyCellType.Сash,
               IsDeleted = false
            },
            new MoneyCell {
               Balance = 150000,
               CreationDate = DateTime.Now,
               CurrencyType = CurrencyType.RUB,
               Name = "Для вклада в Восточный банк",
               Status = MoneyCellStatus.Active,
               IsDeleted = false,
               OwnerId = 1,
               Type = MoneyCellType.Сash
            },
            new MoneyCell {
               Balance = 605000,
               CreationDate = new DateTime(2018, 4, 10),
               Status = MoneyCellStatus.Active,
               IsDeleted = false,
               CurrencyType = CurrencyType.RUB,
               Name = "Вклад в восточном банке",
               OwnerId = 1,
               Type = MoneyCellType.Deposit
            },

            new MoneyCell {
               Status = MoneyCellStatus.Active,
               Type = MoneyCellType.Card,
               Balance = 10000,
               CreationDate = new DateTime(2018, 4, 2),
               CurrencyType = CurrencyType.RUB,
               IsDeleted = false,
               Name = "Зарплатная карта Сбербанк",
               OwnerId = 1
            }
         };
         return insert;
      }

      //private static Expression<Func<MoneyCell,bool>> GetExpression(MoneyCellFilter filter) {
      //   var moneyCellParameter = Expression.Parameter(typeof(MoneyCell), "m");

      //   var expressions = new List<Expression>();

      //   var isDeletedExpression = Expression.Equal(
      //      Expression.Property(moneyCellParameter, "IsDeleted"),
      //      Expression.Constant(filter.IsDeleted));
      //   expressions.Add(isDeletedExpression);

      //   if (filter.Ids != null) {
      //      var idsExpression = Expression.Call(
      //         typeof(HashSet<long>)
      //         ,"Contains"
      //         ,new []{typeof(long)}
      //         ,) 
      //   }

      //   return Expression.Lambda<Func<MoneyCell, bool>>(null, moneyCellParameter);
      //}
   }
}