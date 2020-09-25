using Coravel.Scheduling.Schedule.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Freyr.Features.OpenWeather
{
    public static class Extensions
    {
        public static IScheduler ScheduleOpenWeatherWorker(this IScheduler scheduler)
        {
            scheduler
                .Schedule<OpenWeatherWorker>()
                .EveryMinute();

            return scheduler;
        }

        public static IServiceCollection AddOpenWeather(this IServiceCollection services)
        {
            services
                .AddTransient<OpenWeatherWorker>();

            return services;
        }
    }
}