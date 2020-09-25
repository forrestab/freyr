using Coravel.Scheduling.Schedule.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Freyr.Features.Gateway
{
    public static class Extensions
    {
        public static IScheduler ScheduleGatewayWorker(this IScheduler scheduler, 
            IOptions<GatewayOptions> options)
        {
            if (options.Value.Enable)
            {
                scheduler
                    .Schedule<GatewayWorker>()
                    .Cron(options.Value.CronSchedule);
            }

            return scheduler;
        }

        public static IServiceCollection AddGateway(this IServiceCollection services, 
            IConfiguration configuration)
        {
            services
                .Configure<GatewayOptions>(configuration.GetSection("Gateway"))
                .AddTransient<GatewayWorker>();

            return services;
        }
    }
}