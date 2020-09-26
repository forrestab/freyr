using Coravel;
using Freyr.Coravel;
using Freyr.Features.Gateway;
using Freyr.Features.OpenWeather;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Serilog;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Freyr
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            IConfiguration Configuration = GetConfiguration(new ConfigurationBuilder());
            Log.Logger = CreateSerilogLogger(Configuration);

            try
            {
                Log.Information("{ApplicationName} starting...");
                await CreateHostBuilder(args, Configuration).Build()
                    .UseScheduler((scheduler, serviceProvider) =>
                    {
                        scheduler
                            .ScheduleGatewayWorker(serviceProvider.GetRequiredService<IOptions<GatewayOptions>>())
                            .ScheduleOpenWeatherWorker(serviceProvider.GetRequiredService<IOptions<OpenWeatherOptions>>());
                    })
                    .RunAsync();
            }
            catch(Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly.");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args, IConfiguration configuration) =>
            Host.CreateDefaultBuilder()
                .ConfigureAppConfiguration(builder => builder.AddConfiguration(configuration))
                .ConfigureServices((context, services) => 
                {
                    services
                        .AddOptions()
                        .AddScheduler()
                        .AddGateway(configuration)
                        .AddOpenWeather(configuration);
                })
                .ConfigureLogging(logging => logging.AddSerilog());

        public static IConfiguration GetConfiguration(IConfigurationBuilder builder) =>
            builder
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false)
                .AddEnvironmentVariables()
                .Build();

        public static ILogger CreateSerilogLogger(IConfiguration configuration) =>
            new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();
    }
}
