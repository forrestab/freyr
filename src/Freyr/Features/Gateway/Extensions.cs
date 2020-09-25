using Coravel.Scheduling.Schedule.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Freyr.Features.Gateway
{
    public static class Extensions
    {
        public static IScheduler ScheduleGatewayWorker(this IScheduler scheduler)
        {
            scheduler
                .Schedule<GatewayWorker>()
                .EveryMinute();

            return scheduler;
        }

        public static IServiceCollection AddGateway(this IServiceCollection services)
        {
            services
                .AddTransient<GatewayWorker>();

            return services;
        }
    }
}