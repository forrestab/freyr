import fetch, { Response } from "node-fetch";

import WeatherConfig from "../../common/config/weather-config";
import MediatorWithDb from "../../common/mediator";
import { TemperatureHandler, Temperature, TemperatureUnit } from "../../measurements/temperature";
import { HumidityHandler, Humidity } from "../../measurements/humidity";
import { SourceTag } from "../../measurements/tags";
import Measurement from "../../measurements/measurement";
import WeatherResult from "./weather-result";

export default class WeatherService {
    private url: string = "https://api.openweathermap.org/data/2.5/weather";

    constructor(
        private config: WeatherConfig,
        private mediator: MediatorWithDb
    ) { }

    public async getCurrentByCityId(cityId: string): Promise<WeatherResult> {
        // Sending `metric` because I am auto converting celcius to fahrenheit
        let result: WeatherResult = await fetch(`${this.url}?appid=${this.config.appId}&units=metric&id=${cityId}`)
            .then((response: Response) => response.json())
            .then((json: any) => WeatherResult.create(json));

        await this.mediator.Send(
            TemperatureHandler.Type, 
            new Measurement<Temperature>(
                new Temperature(result.temperature, TemperatureUnit.Celcius),
                SourceTag.getTag("api")
            )
        );

        await this.mediator.Send(
            HumidityHandler.Type,
            new Measurement<Humidity>(
                new Humidity(result.humidity),
                SourceTag.getTag("api")
            )
        );

        return result;
    }
}
