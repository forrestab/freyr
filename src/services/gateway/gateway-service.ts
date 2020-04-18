import fetch, { Response } from "node-fetch";

import GatewayConfig from "../../common/config/gateway-config";
import MediatorWithDb from "../../common/mediator";
import { TemperatureHandler, Temperature, TemperatureUnit } from "../../measurements/temperature";
import { HumidityHandler, Humidity } from "../../measurements/humidity";
import { SourceTag } from "../../measurements/tags";
import Measurement from "../../measurements/measurement";
import SensorResult, { SensorType } from "./sensor-result";
import { contains } from "../../common/utils/string";

export default class GatewayService {
    private url: string;

    constructor(
        private config: GatewayConfig,
        private mediator: MediatorWithDb
    ) {
        this.url = `http://${config.host}:${config.port}/api/${config.apiKey}`;
    }

    public async read(): Promise<void> {
        let sensors: SensorResult[] = await fetch(`${this.url}/sensors`)
            .then((response: Response) => response.json())
            .then((json: any) => Object.keys(json).map((key: string) => json[key]))
            // Assuming `etag=null` to be virtual sensors and I want to ignore those
            .then((sensors: any) => sensors.filter((sensor: any) => sensor.etag !== null))
            // Exclude measurements not currently being collected
            .then((sensors: any) => sensors.filter((sensor: any) => contains(sensor.type, this.config.allowedSensors)))
            .then((sensors: any) => sensors.map((sensor: any) => SensorResult.create(sensor)));     

        for (let sensor of sensors) {
            if (sensor.type === SensorType.Temperature) {
                await this.mediator.Send(
                    TemperatureHandler.Type, 
                    new Measurement<Temperature>(
                        new Temperature(sensor.value, TemperatureUnit.Celcius),
                        SourceTag.getTag(sensor.name)
                    )
                );
            } else if (sensor.type === SensorType.Humidity) {
                await this.mediator.Send(
                    HumidityHandler.Type,
                    new Measurement<Humidity>(
                        new Humidity(sensor.value),
                        SourceTag.getTag(sensor.name)
                    )
                );
            }
        }
    }
}
