using System.Threading.Tasks;
using Coravel.Invocable;
using Microsoft.Extensions.Logging;

namespace Freyr.Features.Gateway
{
    public class GatewayWorker : IInvocable
    {
        private readonly ILogger<GatewayWorker> logger;

        public GatewayWorker(ILogger<GatewayWorker> logger)
        {
            this.logger = logger;
        }

        public Task Invoke()
        {
            this.logger.LogInformation("GatewayWorker invoked");

            return Task.CompletedTask;
        }
    }
}
