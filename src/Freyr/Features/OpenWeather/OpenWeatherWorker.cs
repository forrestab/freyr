using Coravel.Invocable;
using Freyr.Features.OpenWeather.Client;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Freyr.Features.OpenWeather
{
    public class OpenWeatherWorker : IInvocable
    {
        private readonly ILogger<OpenWeatherWorker> logger;
        private readonly OpenWeatherOptions options;
        private readonly IOpenWeatherClient openWeatherClient;

        public OpenWeatherWorker(ILogger<OpenWeatherWorker> logger, IOptions<OpenWeatherOptions> options, 
            IOpenWeatherClient openWeatherClient)
        {
            this.logger = logger;
            this.options = options.Value;
            this.openWeatherClient = openWeatherClient;
        }

        public async Task Invoke()
        {
            this.logger.LogInformation("OpenWeatherWorker invoked");

            CurrentWeather Response = await this.openWeatherClient.GetCurrentWeatherByCityIdAsync(this.options.CityId);

            this.logger.LogInformation("OpenWeather Result: {@WeatherResult}", Response);
        }
    }
}
