
using System;
using System.Collections.Generic;
using System.Text;
using JRPC.Client;
using MyCompany.Services.MoneyCells.Contracts;
using MyCompany.Services.MoneyCells.Contracts.Data;
using MyCompany.Services.MoneyCells.Contracts.Enums;
using MyCompany.Services.MoneyCells.Contracts.Seacrh;
using MyCompany.Services.People.Contracts;
using MyCompany.Services.People.Contracts.Data;

namespace Sandbox {
   internal class Program {
      private const string PRETTY_LINE = "*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*";

      private static void Main(string[] args) {
         //TestPeopleService();

         var client = new JRpcClient("http://127.0.0.1:15555");
         var proxy = client.GetProxy<IMoneyCellsService>("MoneyCellsService");
         TransactionTest(proxy);
         //var cells = GetMoneyCells();

         //var result = proxy.Upsert(cells);

         //var filter = new MoneyCellFilter {
         //   Ids = new HashSet<long> { 1, 2 },
         //   IsDeleted = false,
         //   OwnersIds = null,
         //   Statuses = null
         //};

         //var result = proxy.Get(filter);

         //Console.ReadKey();
      }

      private static void TestPeopleService() {
         var peopleClient = new JRpcClient("http://127.0.0.1:14444");

         var peopleProxy = peopleClient.GetProxy<IPeopleService>("PeopleService");

         //var people = new List<Person> {
         //   new Person {
         //      FirstName = "Зуев",
         //      LastName = "Алексей",
         //      MiddleName = "Александрович",
         //      BirthDate = new DateTime(1990,11,13)
         //   },
         //   new Person {
         //      FirstName = "Зуева",
         //      LastName = "Наталья",
         //      MiddleName = "Сергеевна",
         //      BirthDate = new DateTime(1993,11,27)
         //   },
         //};
         //var result = peopleProxy.Upsert(people);
         var result = peopleProxy.GetPeople(new long[] {1, 2});
      }

      private static void TransactionTest(IMoneyCellsService moneyCellsService) {
         while (true) {
            ShowMoneyCellsInfo(moneyCellsService);
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
            var transaction = ProcessTransaction(moneyCellsService,fromId, toId, amount);        
            StringBuilder sb = new StringBuilder();
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
               Console.WriteLine();
               break;
            }
         }
      }

      private static Transaction ProcessTransaction(IMoneyCellsService moneyCellsService,long fromId, long toId, long amount) {
         if (fromId == default(long)) {
            return moneyCellsService.Replenish(toId, amount);
         }

         return toId == default(long)
            ? moneyCellsService.WithDraw(fromId, amount)
            : moneyCellsService.ProcessTransaction(fromId, toId, amount);
      }

      private static void ShowMoneyCellsInfo(IMoneyCellsService moneyCellsService) {
         Console.WriteLine("Инфа по картонкам:");
         var filter = new MoneyCellFilter {Statuses = new HashSet<MoneyCellStatus> {MoneyCellStatus.Active}};
         var moneyCells = moneyCellsService.Get(filter);
         foreach (var cell in moneyCells) {
            Show(cell);
         }
         Console.WriteLine(PRETTY_LINE);
      }

      private static void Show(MoneyCell cell) {
         Console.WriteLine(PRETTY_LINE);
         var sb = new StringBuilder();
         sb.AppendLine($"{cell.Name}:");
         sb.AppendLine($"Идентификатор : {cell.Id} ({cell.Type})");
         sb.AppendLine($"Баланс : {cell.Balance} {cell.Currency}");
         Console.WriteLine(sb.ToString());
      }

      private static List<MoneyCell> GetMoneyCells() {
         var insert = new List<MoneyCell> {
            new MoneyCell {
               Balance = 1100,
               CreationDate = DateTime.Now,
               Currency = Currency.RUB,
               Name = "Кошелек",
               OwnerId = 1,
               Status = MoneyCellStatus.Active,
               Type = MoneyCellType.Сash,
               IsDeleted = false
            },
            new MoneyCell {
               Balance = 1,
               CreationDate = DateTime.Now,
               Currency = Currency.USD,
               Name = "Наташкина заначка",
               OwnerId = 2,
               Status = MoneyCellStatus.Active,
               Type = MoneyCellType.Сash,
               IsDeleted = false
            },
            new MoneyCell {
               Balance = 150000,
               CreationDate = DateTime.Now,
               Currency = Currency.RUB,
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
               Currency = Currency.RUB,
               Name = "Вклад в восточном банке",
               OwnerId = 1,
               Type = MoneyCellType.Deposit
            },

            new MoneyCell {
               Status = MoneyCellStatus.Active,
               Type = MoneyCellType.Card,
               Balance = 10000,
               CreationDate = new DateTime(2018, 4, 2),
               Currency = Currency.RUB,
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