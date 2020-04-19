import { join } from "path";
import { parse } from "dotenv";

import { readFileAsync } from "../utils/fs";
import DatabaseConfig from "./database-config";
import WeatherConfig from "./weather-config";
import GatewayConfig from "./gateway-config";

export default class Config {
    private static configFile: string = "/../../../.env";
    public database!: DatabaseConfig;
    public weather!: WeatherConfig;
    public gateway!: GatewayConfig;

    public static async load(): Promise<Config> {
        let env: any = null;        
        let config: Config = new Config();

        if (process.env.NODE_ENV !== "docker") {
            env = parse(await readFileAsync(join(__dirname, Config.configFile)));
        } else {
            env = process.env;
        }

        config.database = new DatabaseConfig(env.DB_HOST, env.DB_NAME);
        config.weather = new WeatherConfig(env.WEATHER_APP_ID, env.WEATHER_CITY_ID);
        config.gateway = new GatewayConfig(env.GATEWAY_HOST, parseInt(env.GATEWAY_PORT), 
            env.GATEWAY_API_KEY, env.GATEWAY_ALLOWED_SENSORS.split(","));

        return config;
    }
}
