import { schedule } from "node-cron";

import Config from "./common/config";
import run from "./app";

const log = console.log;

(async () => {
    let config: Config = await Config.load();

    log(`Starting schedule ${config.schedule.cron}`);

    schedule(config.schedule.cron, async () => {
        await run(config);
    });
})();
