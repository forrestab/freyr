import { ISchemaOptions, FieldType } from "influx";

import TemperatureHandler from "./handler";

export default {
    measurement: TemperatureHandler.Type,
    tags: [ 
        "deviceId",
        "unit"
    ],
    fields: {
        value: FieldType.FLOAT
    }
} as ISchemaOptions;
