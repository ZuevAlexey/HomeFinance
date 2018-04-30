using System;
using Consul;
using JRPC.Service;
using JRPC.Service.Host.Owin;
using JRPC.Service.Registry;
using MoneyCellsService.Data.Providers;
using MoneyCellsService.Managers;
using MoneyCellsService.Mapping;

namespace MoneyCellsService {
   class Program {
      static void Main(string[] args) {
         var client = new ConsulClient();
         var registry = new DefaultModulesRegistry();
         var moneyCellProvider = new MoneyCellsProvider();
         registry.AddJRpcModule(new Service.MoneyCellsService(new MoneyCellsMapper(), moneyCellProvider,
            new TransactionManager(moneyCellProvider)));
         var svc = new JRpcService(registry, client, new OwinJrpcServer());
         svc.Start();
         Console.ReadLine();
         svc.Stop();
      }
   }
}