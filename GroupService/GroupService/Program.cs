using JRPC.Service;
using MyCompany.Services.Groups.Service.IoC;
using Topshelf;
using Topshelf.Ninject;

namespace MyCompany.Services.Groups.Service {
   internal class Program {
      private static void Main(string[] args) {
         HostFactory.Run(c => {
            c.UseNinject(new GroupServiceCoreModule())
               .Service<JRpcService>(s => {
                  s.ConstructUsingNinject();
                  s.WhenStarted((service, control) => service.Start());
                  s.WhenStopped((service, control) => service.Stop());
               });
            c.RunAsNetworkService();
            c.SetServiceName("GroupService");
            c.SetDisplayName("MyCompany Group Service");
            c.SetDescription("Сервис для формирования различных элементов в группы и управления ими");
         });
      }
   }
}