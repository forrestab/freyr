using System.Threading.Tasks;

namespace Freyr.Features.OpenWeather.Client
{
    public interface IOpenWeatherClient
    {
        Task<CurrentWeather> GetCurrentWeatherByCityIdAsync(string cityId);
    }
}
