import { InfluxDB } from "influx";
import { read, ReadResult } from "node-dht-sensor";

import DbConfig from "./common/database/db-config";
import { TemperatureHandler, TemperatureSchema, Temperature } from "./features/temperature";
import { HumidityHandler, HumiditySchema } from "./features/humidity";
import Measurement from "./common/measurement";
import MediatorWithDb from "./common/mediator";

import "./env";

(async () => {
    let dbConfig: DbConfig = new DbConfig(TemperatureSchema, HumiditySchema);
    let influx: InfluxDB = new InfluxDB(dbConfig);
    let mediator: MediatorWithDb = new MediatorWithDb(influx);

    let result: ReadResult = await read(process.env.SENSOR_TYPE, process.env.SENSOR_PIN);
    
    await mediator.Send(TemperatureHandler.Type, new Measurement<Temperature>(new Temperature(result.temperature)));
    await mediator.Send(HumidityHandler.Type, new Measurement<number>(result.humidity));
})();
