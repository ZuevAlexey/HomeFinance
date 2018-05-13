using Consul;
using JRPC.Registry.Ninject;
using JRPC.Service;
using JRPC.Service.Host.Owin;
using JRPC.Service.Registry;
using MyCompany.Services.MoneyCells.Service.Mapping;
using MyCompany.Services.People.Contracts;
using MyCompany.Services.People.Service.Data.Provider;
using MyCompany.Services.People.Service.Mapping;
using MyCompany.Services.People.Service.Service;
using Ninject.Modules;

namespace MyCompany.Services.People.Service.IoC {
   public class PeopleServiceCoreModule : NinjectModule {
      /// <summary>Loads the module into the kernel.</summary>
      public override void Load() {
         Bind<IJrpcServerHost>().To<OwinJrpcServer>();
         Bind<IConsulClient>().To<ConsulClient>();
         Bind<JRpcModule>().To<PeopleService>();
         Bind<JRpcService>().ToSelf();
         Bind<IModulesRegistry>().To<NinjectModulesRegistry>();
         Bind<IPeopleService>().ToSelf();

         Bind<IPeopleProvider>().To<PeopleProvider>().InSingletonScope();
         Bind<IPeopleMapper>().To<PeopleMapper>().InSingletonScope();
      }
   }
}