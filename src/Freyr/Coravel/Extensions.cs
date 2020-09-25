using System;
using Coravel;
using Coravel.Scheduling.Schedule.Interfaces;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace Freyr.Coravel
{
    public static class Extensions
    {
        public static IHost UseScheduler(this IHost host, Action<IScheduler> scheduleTasks)
        {
            host.Services
                .UseScheduler(scheduleTasks)
                .OnError(ex => Log.Fatal(ex, "Scheduler failed to start."));
            
            return host;
        }
    }
}
