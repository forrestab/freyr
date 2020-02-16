import { ISchemaOptions, FieldType } from "influx";

import HumidityHandler from "./humidity-handler";

export default {
    measurement: HumidityHandler.Type,
    tags: [ 
        "deviceId"
    ],
    fields: {
        value: FieldType.FLOAT
    }
} as ISchemaOptions;
