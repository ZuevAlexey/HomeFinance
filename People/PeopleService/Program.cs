using JRPC.Service;
using MyCompany.Services.MoneyCells.Service.IoC;
using Topshelf;
using Topshelf.Ninject;

namespace MyCompany.Services.People.Service {
   internal class Program {
      private static void Main(string[] args) {
         HostFactory.Run(c => {
            c.UseNinject(new PeopleServiceCoreModule())
               .Service<JRpcService>(s => {
                  s.ConstructUsingNinject();
                  s.WhenStarted((service, control) => service.Start());
                  s.WhenStopped((service, control) => service.Stop());
               });
            c.RunAsNetworkService();
            c.SetServiceName("PeopleService");
            c.SetDisplayName("MyCompany People Service");
            c.SetDescription("Сервис для изменения информации о людях - владельцах валютных ячеек");
         });
      }
   }
}