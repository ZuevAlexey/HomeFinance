using Consul;
using JRPC.Registry.Ninject;
using JRPC.Service;
using JRPC.Service.Host.Owin;
using JRPC.Service.Registry;
using MyCompany.Services.Groups.Contracts;
using MyCompany.Services.Groups.Service.Data.Provider;
using MyCompany.Services.Groups.Service.Mapping;
using MyCompany.Services.Groups.Service.Service;
using Ninject.Modules;

namespace MyCompany.Services.Groups.Service.IoC {
   internal class GroupServiceCoreModule : NinjectModule {
      /// <summary>Loads the module into the kernel.</summary>
      public override void Load() {
         Bind<IJrpcServerHost>().To<OwinJrpcServer>();
         Bind<IConsulClient>().To<ConsulClient>();
         Bind<JRpcModule>().To<GroupService>();
         Bind<JRpcService>().ToSelf();
         Bind<IModulesRegistry>().To<NinjectModulesRegistry>();
         Bind<IGroupService>().ToSelf();

         Bind<IGroupProvider>().To<GroupProvider>().InSingletonScope();
         Bind<IGroupMapper>().To<GroupMapper>().InSingletonScope();
      }
   }
}