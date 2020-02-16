import { KeyValuePair } from "../../common/types";

export default class SourceTag {
    public static getTag(source: string): KeyValuePair {
        return {
            deviceId: source
        } as KeyValuePair;
    }
}
