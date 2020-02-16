import { InfluxDB } from "influx";

import { TemperatureSchema } from "./measurements/temperature";
import { HumiditySchema } from "./measurements/humidity";
import MediatorWithDb from "./common/mediator";
import Config from "./common/config";
import InfluxRepository from "./common/influx-repository";
import { SensorService } from "./services/sensor";
import { WeatherService } from "./services/weather";

(async () => {
    let config: Config = await Config.load();
    let db: InfluxDB = new InfluxDB(config.database.toInfluxConfig(TemperatureSchema, HumiditySchema));
    let repository: InfluxRepository = new InfluxRepository(db);
    let mediator: MediatorWithDb = new MediatorWithDb(repository);
    let sensor: SensorService = new SensorService(config.sensor, mediator);
    let weather: WeatherService = new WeatherService(config.weather, mediator);

    await sensor.read();
    await weather.getCurrentByCityId(config.weather.cityId);

    await repository.save();
})();
