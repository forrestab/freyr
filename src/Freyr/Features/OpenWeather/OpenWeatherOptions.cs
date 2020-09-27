namespace Freyr.Features.OpenWeather
{
    public class OpenWeatherOptions
    {
        public bool Enable { get; set; }
        public string CronSchedule { get; set; }
        public string AppId { get; set; }
        public string CityId { get; set; }
    }
}
