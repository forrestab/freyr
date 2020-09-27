using System.Collections.Generic;
using System.Threading.Tasks;
using Flurl;
using Flurl.Http;
using Flurl.Http.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Freyr.Features.OpenWeather.Client
{
    public partial class OpenWeatherClient : IOpenWeatherClient
    {
        private static readonly ISerializer jsonSerializer = new NewtonsoftJsonSerializer(new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore
        });

        private readonly OpenWeatherOptions options;

        public OpenWeatherClient(IOptions<OpenWeatherOptions> options)
        {
            this.options = options.Value;
        }

        private IFlurlRequest GetBaseUrl(string version = "2.5") =>
            new Url($"https://api.openweathermap.org/data/{version}")
                .SetQueryParam("appid", this.options.AppId)
                .ConfigureRequest(settings => settings.JsonSerializer = jsonSerializer);
    }
}