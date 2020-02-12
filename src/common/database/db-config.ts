import { ISingleHostConfig, ISchemaOptions } from "influx";

export default class DbConfig implements ISingleHostConfig {
    public host: string;
    public database: string;
    public schemas: ISchemaOptions[];

    constructor(...schemas: ISchemaOptions[]) {
        this.host = process.env.DB_HOST || "";
        this.database = process.env.DB_NAME || "";
        this.schemas = schemas;
    }
}
