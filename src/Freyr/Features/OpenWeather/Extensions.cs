using Coravel.Scheduling.Schedule.Interfaces;
using Freyr.Features.OpenWeather.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Freyr.Features.OpenWeather
{
    public static class Extensions
    {
        public static IScheduler ScheduleOpenWeatherWorker(this IScheduler scheduler,
            IOptions<OpenWeatherOptions> options)
        {
            if (options.Value.Enable)
            {
                scheduler
                    .Schedule<OpenWeatherWorker>()
                    .Cron(options.Value.CronSchedule);
            }

            return scheduler;
        }

        public static IServiceCollection AddOpenWeather(this IServiceCollection services,
            IConfiguration configuration)
        {
            services
                .Configure<OpenWeatherOptions>(configuration.GetSection("OpenWeather"))
                .AddTransient<IOpenWeatherClient, OpenWeatherClient>()
                .AddTransient<OpenWeatherWorker>();

            return services;
        }
    }
}