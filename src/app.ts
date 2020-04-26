import { InfluxDB } from "influx";

import { TemperatureSchema } from "./measurements/temperature";
import { HumiditySchema } from "./measurements/humidity";
import MediatorWithDb from "./common/mediator";
import Config from "./common/config";
import InfluxRepository from "./common/influx-repository";
import { WeatherService } from "./services/weather";
import { GatewayService } from "./services/gateway";

const log = console.log;

export default async function run(config: Config) {
    log("Start reading sensors");

    let db: InfluxDB = new InfluxDB(config.database.toInfluxConfig(TemperatureSchema, HumiditySchema));
    let repository: InfluxRepository = new InfluxRepository(db);
    let mediator: MediatorWithDb = new MediatorWithDb(repository);
    let weather: WeatherService = new WeatherService(config.weather, mediator);
    let gateway: GatewayService = new GatewayService(config.gateway, mediator);

    await weather.getCurrentByCityId(config.weather.cityId);
    await gateway.read();

    await repository.save();

    log("End reading sensors");
};
