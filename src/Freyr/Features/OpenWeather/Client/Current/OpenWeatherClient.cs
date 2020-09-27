using System.Collections.Generic;
using System.Threading.Tasks;
using Flurl.Http;

namespace Freyr.Features.OpenWeather.Client
{
    public partial class OpenWeatherClient
    {
        private IFlurlRequest GetCurrentUrl() =>
            this.GetBaseUrl()
                .AppendPathSegment("weather")
                .SetQueryParam("units", "metric");

        public async Task<CurrentWeather> GetCurrentWeatherByCityIdAsync(string cityId)
        {
            Dictionary<string, object> Params = new Dictionary<string, object>
            {
                ["id"] = cityId
            };

            return await this.GetCurrentUrl()
                .SetQueryParams(Params)
                .GetJsonAsync<CurrentWeather>();
        }
    }
}
