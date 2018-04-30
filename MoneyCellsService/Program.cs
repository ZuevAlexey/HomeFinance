using System;
using Consul;
using JRPC.Service;
using JRPC.Service.Host.Owin;
using JRPC.Service.Registry;
using MoneyCellsService.Data.Providers;
using MoneyCellsService.IoC;
using MoneyCellsService.Managers;
using MoneyCellsService.Mapping;
using Topshelf;
using Topshelf.Ninject;

namespace MoneyCellsService {
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