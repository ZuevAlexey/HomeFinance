using Consul;
using JRPC.Service;
using JRPC.Service.Host.Owin;
using JRPC.Service.Registry;
using System;

namespace MoneyCellsService {
   class Program {
      static void Main(string[] args) {
         var client = new ConsulClient();
         var registry = new DefaultModulesRegistry();
         registry.AddJRpcModule(new Service.MoneyCellsService());
         var svc = new JRpcService(registry, client, new OwinJrpcServer());
         svc.Start();
         Console.ReadLine();
         svc.Stop();
      }
   }
}
