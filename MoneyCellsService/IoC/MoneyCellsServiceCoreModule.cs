using Consul;
using JRPC.Registry.Ninject;
using JRPC.Service;
using JRPC.Service.Host.Owin;
using JRPC.Service.Registry;
using MoneyCellsService.Data.Providers;
using MoneyCellsService.Managers;
using MoneyCellsService.Mapping;
using MyCompany.Services.Entity.MoneyCells.Contracts;
using Ninject.Modules;

namespace MoneyCellsService.IoC {
   public class MoneyCellsServiceCoreModule : NinjectModule {
      /// <summary>Loads the module into the kernel.</summary>
      public override void Load() {
         Bind<IMoneyCellsMapper>().To<MoneyCellsMapper>().InSingletonScope();
         Bind<IMoneyCellsProvider>().To<MoneyCellsProvider>().InSingletonScope();
         Bind<ITransactionManager>().To<TransactionManager>().InSingletonScope();
         Bind<IJrpcServerHost>().To<OwinJrpcServer>();
         Bind<IConsulClient>().To<ConsulClient>();
         Bind<JRpcModule>().To<Service.MoneyCellsService>();
         Bind<JRpcService>().ToSelf();
         Bind<IModulesRegistry>().To<NinjectModulesRegistry>();
         Bind<IMoneyCellsService>().ToSelf();
      }
   }
}