import { InfluxDB, IPoint } from "influx";

export default class InfluxRepository {
    private measurements: IPoint[];

    constructor(
        private db: InfluxDB
    ) {
        this.measurements = [];
    }

    public add(measurement: IPoint): void {
        this.measurements.push(measurement);
    }

    public async save(): Promise<void> {
        this.db.writePoints(this.measurements);
    }
}
