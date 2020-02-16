import { hostname } from "os";

import { KeyValuePair } from "../../common/types";

export default class HostNameTag {
    public static getTag(): KeyValuePair {
        return {
            deviceId: hostname()
        } as KeyValuePair;
    }
}
