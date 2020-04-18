import { KeyValuePair } from "../../common/types";

export enum SensorType {
    Temperature,
    Humidity
}

export default class SensorResult {
    constructor(
        public name: string,
        public value: number,
        public type: SensorType
    ) {}

    public static create(sensor: any): SensorResult {
        let value: number = sensor.state.temperature ?? 0;
        let sensorType: SensorType = SensorType.Temperature;

        if (sensor.type.toLowerCase().includes("humidity")) {
            value = sensor.state.humidity;
            sensorType = SensorType.Humidity;
        }

        return new SensorResult(sensor.name.toLowerCase(), value / 100, sensorType);
    }
}
