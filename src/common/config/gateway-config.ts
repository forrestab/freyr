export default class SensorConfig {
    constructor(
        public host: string,
        public port: number,
        public apiKey: string,
        public allowedSensors: string[]
    ) { }
}
