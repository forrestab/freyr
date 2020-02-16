import { ICommandHandler, Handler } from "tsmediator";
import { IPoint } from "influx";

import { KeyValuePair } from "../../common/types";
import Measurement from "../measurement";
import Temperature from "./temperature";
import { toFahrenheit, toCelcius } from "./temperature-utils";
import InfluxRepository from "../../common/influx-repository";

@Handler(TemperatureHandler.Type)
export default class TemperatureHandler implements ICommandHandler<Measurement<Temperature>, Promise<void>> {
    public static get Type(): string {
        return "temperature";
    }

    constructor(private repository: InfluxRepository) { }

    public async Handle(command: Measurement<Temperature>): Promise<void> {
        this.repository.add(
            this.createPoint(
                toCelcius(command.field), 
                Object.assign({}, { unit: "celcius" }, command.tags)
            )
        );
        
        this.repository.add(
            this.createPoint(
                toFahrenheit(command.field), 
                Object.assign({}, { unit: "fahrenheit" }, command.tags)
            )
        );
    }

    private createPoint(value: number, tags: KeyValuePair): IPoint {
        return {
            measurement: TemperatureHandler.Type,
            tags,
            fields: { value }
        } as IPoint;
    }
} 
