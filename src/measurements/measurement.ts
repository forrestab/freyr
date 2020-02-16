import { KeyValuePair } from "../common/types";

export default class Measurement<T> {
    public tags!: KeyValuePair;

    constructor(
        public field: T,
        ...tags: KeyValuePair[]
    ) {
        this.tags = Object.assign({}, ...tags);
    }
}
