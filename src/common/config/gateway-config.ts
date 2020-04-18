export default class GatewayConfig {
    constructor(
        public host: string,
        public port: number,
        public apiKey: string,
        public allowedSensors: string[]
    ) { }
}
