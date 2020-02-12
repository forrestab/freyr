import { hostname } from "os";

export default class Measurement<T> {
    public deviceId: string;

    constructor(
        public value: T
    ) {
        this.deviceId = hostname();
    }
}