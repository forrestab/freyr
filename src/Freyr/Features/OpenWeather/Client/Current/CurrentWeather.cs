using Newtonsoft.Json;

namespace Freyr.Features.OpenWeather.Client
{
    public class CurrentWeather
    {
        public MainWeather Main { get; set; }

        public class MainWeather
        {
            [JsonProperty("temp")]
            public double Temperature { get; set; }
            public double Humidity { get; set; }
        }
    }
}
