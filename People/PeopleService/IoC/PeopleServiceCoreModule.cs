using Consul;
using JRPC.Registry.Ninject;
using JRPC.Service;
using JRPC.Service.Host.Owin;
using JRPC.Service.Registry;
using MyCompany.Services.People.Contracts;
using MyCompany.Services.People.Service.Service;
using Ninject.Modules;

namespace MyCompany.Services.MoneyCells.Service.IoC {
   public class PeopleServiceCoreModule : NinjectModule {
      /// <summary>Loads the module into the kernel.</summary>
      public override void Load() {
         Bind<IJrpcServerHost>().To<OwinJrpcServer>();
         Bind<IConsulClient>().To<ConsulClient>();
         Bind<JRpcModule>().To<PeopleService>();
         Bind<JRpcService>().ToSelf();
         Bind<IModulesRegistry>().To<NinjectModulesRegistry>();
         Bind<IPeopleService>().ToSelf();
      }
   }
}