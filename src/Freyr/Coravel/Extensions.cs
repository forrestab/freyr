using System;
using Coravel;
using Coravel.Scheduling.Schedule.Interfaces;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace Freyr.Coravel
{
    public static class Extensions
    {
        public static IHost UseScheduler(this IHost host, Action<IScheduler, IServiceProvider> scheduleTasks)
        {
            host.Services
                .UseScheduler(scheduler => scheduleTasks(scheduler, host.Services))
                .OnError(ex => Log.Fatal(ex, "Scheduler failed to start."));
            
            return host;
        }
    }
}
