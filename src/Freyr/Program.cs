﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Freyr
{
    class Program
    public class Program
    {
        static void Main(string[] args)
        public static async Task Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            IConfiguration Configuration = GetConfiguration(new ConfigurationBuilder());
            Log.Logger = CreateSerilogLogger(Configuration);

            try
            {
                Log.Information("{ApplicationName} starting...");
                await CreateHostBuilder(args, Configuration).RunConsoleAsync();
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
            new HostBuilder()
                .ConfigureAppConfiguration(builder => builder.AddConfiguration(configuration))
                .ConfigureServices((context, services) => 
                {
                    services
                        .AddOptions();
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