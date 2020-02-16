import { join } from "path";
import { parse, DotenvParseOutput } from "dotenv";

import { readFileAsync } from "../utils/fs";
import DatabaseConfig from "./database-config";
import SensorConfig from "./sensor-config";
import WeatherConfig from "./weather-config";

export default class Config {
    public database!: DatabaseConfig;
    public sensor!: SensorConfig;
    public weather!: WeatherConfig;

    public static async load(): Promise<Config> {
        let env: DotenvParseOutput = parse(await readFileAsync(join(__dirname, "/../../../.env")));
        let config: Config = new Config();

        config.sensor = new SensorConfig(env.SENSOR_TYPE, env.SENSOR_PIN);
        config.database = new DatabaseConfig(env.DB_HOST, env.DB_NAME);
        config.weather = new WeatherConfig(env.WEATHER_APP_ID, env.WEATHER_CITY_ID);

        return config;
    }
}
