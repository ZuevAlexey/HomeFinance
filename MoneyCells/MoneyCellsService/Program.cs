using JRPC.Service;
using MyCompany.Services.MoneyCells.Service.IoC;
using Topshelf;
using Topshelf.Ninject;

namespace MyCompany.Services.MoneyCells.Service {
   class Program {
      static void Main(string[] args) {
         HostFactory.Run(c => {
            c.UseNinject(new MoneyCellsServiceCoreModule())
               .Service<JRpcService>(s => {
                  s.ConstructUsingNinject();
                  s.WhenStarted((service, control) => service.Start());
                  s.WhenStopped((service, control) => service.Stop());
               });
            c.RunAsNetworkService();
            c.SetServiceName("MoneyCellsService");
            c.SetDisplayName("MyCompany MoneyCells Service");
            c.SetDescription("Сервис для работы с валютными ячейками и транзакциями");
         });
      }
   }
}