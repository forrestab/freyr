import { KeyValuePair } from "../../common/types";

export default class WeatherResult {
    constructor(
        public temperature: number,
        public humidity: number
    ) {}

    public static create(json: KeyValuePair): WeatherResult {
        return new WeatherResult(json.main.temp, json.main.humidity);
    }
}
