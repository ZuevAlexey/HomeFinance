using System;
using Nancy;
using Nancy.Hosting.Self;

namespace SyncServer {
    internal class Program {
        private static void Main(string[] args)
        {
            var hostConfigs = new HostConfiguration {
                UrlReservations = new UrlReservations { CreateAutomatically = true }
            };
            var nancyHost = new NancyHost(hostConfigs, new Uri("http://localhost:1234"));
            nancyHost.Start();
            Console.WriteLine("Service started!");
            Console.ReadLine();
            nancyHost.Stop();
            Console.WriteLine("Service stoped!");
        }
    }

    public class Module: NancyModule {
        public Module()
        {
            Get["/{name}"] = x => string.Concat($"Hello {x.name}");
        }
    }
}
