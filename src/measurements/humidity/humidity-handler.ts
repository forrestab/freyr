import { ICommandHandler, Handler } from "tsmediator";
import { IPoint } from "influx";

import { KeyValuePair } from "../../common/types";
import Measurement from "../measurement";
import Humidity from "./humidity";
import InfluxRepository from "../../common/influx-repository";

@Handler(HumidityHandler.Type)
export default class HumidityHandler implements ICommandHandler<Measurement<Humidity>, Promise<void>> {
    public static get Type(): string {
        return "humidity";
    }

    constructor(private repository: InfluxRepository) { }

    public async Handle(command: Measurement<Humidity>): Promise<void> {
        this.repository.add(this.createPoint(command.field.value, command.tags));
    }

    private createPoint(value: number, tags: KeyValuePair): IPoint {
        return {
            measurement: HumidityHandler.Type,
            tags,
            fields: { value }
        } as IPoint;
    }
} 
