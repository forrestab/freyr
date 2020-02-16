import { ISchemaOptions, FieldType } from "influx";

import TemperatureHandler from "./temperature-handler";

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
