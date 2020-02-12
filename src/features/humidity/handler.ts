import { ICommandHandler, Handler } from "tsmediator";
import { InfluxDB, IPoint } from "influx";

import Measurement from "../../common/measurement";

@Handler(HumidityHandler.Type)
export default class HumidityHandler implements ICommandHandler<Measurement<number>, Promise<void>> {
    public static get Type(): string {
        return "humidity";
    }

    constructor(private db: InfluxDB) { }

    public Log(): void { }

    public async Handle(command: Measurement<number>): Promise<void> {
        await this.db.writePoints([
            this.createPoint(HumidityHandler.Type, command.value, command.deviceId)
        ]);
    }

    private createPoint(measurement: string, value: number, deviceId: string): IPoint {
        return {
            measurement,
            tags: { deviceId },
            fields: { value }
        } as IPoint;
    }
} 
