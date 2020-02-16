import { read, ReadResult } from "node-dht-sensor";

import SensorConfig from "../../common/config/sensor-config";
import MediatorWithDb from "../../common/mediator";
import { TemperatureHandler, Temperature, TemperatureUnit } from "../../measurements/temperature";
import { HumidityHandler, Humidity } from "../../measurements/humidity";
import { HostNameTag } from "../../measurements/tags";
import Measurement from "../../measurements/measurement";

export default class SensorService {
    constructor(
        private config: SensorConfig,
        private mediator: MediatorWithDb
    ) { }

    public async read(): Promise<void> {
        let result: ReadResult = await read(this.config.type, this.config.pin);

        await this.mediator.Send(
            TemperatureHandler.Type, 
            new Measurement<Temperature>(
                new Temperature(result.temperature, TemperatureUnit.Celcius),
                HostNameTag.getTag()
            )
        );

        await this.mediator.Send(
            HumidityHandler.Type,
            new Measurement<Humidity>(
                new Humidity(result.humidity),
                HostNameTag.getTag()
            )
        );
    }
}
