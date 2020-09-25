using System.Threading.Tasks;
using Coravel.Invocable;
using Microsoft.Extensions.Logging;

namespace Freyr.Features.OpenWeather
{
    public class OpenWeatherWorker : IInvocable
    {
        private readonly ILogger<OpenWeatherWorker> logger;

        public OpenWeatherWorker(ILogger<OpenWeatherWorker> logger)
        {
            this.logger = logger;
        }

        public Task Invoke()
        {
            this.logger.LogInformation("OpenWeatherWorker invoked");

            return Task.CompletedTask;
        }
    }
}
