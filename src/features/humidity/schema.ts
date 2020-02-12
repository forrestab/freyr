import { ISchemaOptions, FieldType } from "influx";

import HumidityHandler from "./handler";

export default {
    measurement: HumidityHandler.Type,
    tags: [ ],
    fields: {
        value: FieldType.FLOAT
    }
} as ISchemaOptions;
