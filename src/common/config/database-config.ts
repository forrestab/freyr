import { ISingleHostConfig, ISchemaOptions } from "influx";

export default class DatabaseConfig {
    constructor(
        public host: string,
        public name: string
    ) { }

    public toInfluxConfig(...schemas: ISchemaOptions[]): ISingleHostConfig {
        return {
            host: this.host,
            database: this.name,
            schemas
        } as ISingleHostConfig;
    }
}
