import { ICommandHandler, Handler } from "tsmediator";
import { InfluxDB, IPoint } from "influx";

import Measurement from "../../common/measurement";
import Temperature from "./temperature";

@Handler(TemperatureHandler.Type)
export default class TemperatureHandler implements ICommandHandler<Measurement<Temperature>, Promise<void>> {
    public static get Type(): string {
        return "temperature";
    }

    constructor(private db: InfluxDB) { }

    public Log(): void { }

    public async Handle(command: Measurement<Temperature>): Promise<void> {
        await this.db.writePoints([
            this.createPoint(TemperatureHandler.Type, command.value.celcius, "celcius", command.deviceId),
            this.createPoint(TemperatureHandler.Type, command.value.fahrenheit, "fahrenheit", command.deviceId)
        ]);
    }

    private createPoint(measurement: string, value: number, unit: string, deviceId: string): IPoint {
        return {
            measurement,
            tags: { unit, deviceId },
            fields: { value }
        } as IPoint;
    }
} 
