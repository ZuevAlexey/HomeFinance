using System;
using System.Collections.Generic;
using System.Text;
using JRPC.Client;
using MyCompany.Services.MoneyCells.Contracts;
using MyCompany.Services.MoneyCells.Contracts.Data;
using MyCompany.Services.MoneyCells.Contracts.Enums;
using MyCompany.Services.MoneyCells.Contracts.Seacrh;

namespace Sandbox.MoneyCells {
   public static class TransactionTest {
      private const string PRETTY_LINE = "*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*";

      public static void Run() {
         var client = new JRpcClient("http://127.0.0.1:15555");
         var moneyCellsService = client.GetProxy<IMoneyCellsService>("MoneyCellsService");
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
            var transaction = ProcessTransaction(moneyCellsService, fromId, toId, amount);
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

      private static Transaction ProcessTransaction(IMoneyCellsService moneyCellsService, long fromId, long toId,
         long amount) {
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
   }
}