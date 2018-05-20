using JRPC.Client;
using MyCompany.Services.People.Contracts;

namespace Sandbox.People {
   internal static class PeopleTest {
      public static void Run() {
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
   }
}