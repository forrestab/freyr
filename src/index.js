const sensor = require("node-dht-sensor").promises;
const { Client } = require("tplink-smarthome-api");

const { Store } = require("./database");
const schemas = require("./database/measurements");
const { toFahrenheit } = require("./converters/temperature/celcius");

require("dotenv").config();

const SENSOR_CODE = 22;
const GPIO_PORT = 4;
const HUMIDITY_THRESHOLD = 50; // percent

(async () => {
    const { temperature, humidity } = await sensor.read(SENSOR_CODE, GPIO_PORT);
    console.log(`${toFahrenheit(temperature)}F / ${humidity.toFixed(2)}%`);

    const store = new Store({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        schema: Object.values(schemas)
    });
    const locationTag = { location: "basement" };

    await store.write(schemas["temperature"].measurement, { unit: "celcius", ...locationTag }, { value: temperature });
    await store.write(schemas["temperature"].measurement, { unit: "fahrenheit", ...locationTag }, { value: toFahrenheit(temperature) });
    await store.write(schemas["humidity"].measurement, locationTag, { value: humidity });

    const client = new Client();
    const plug = client.getPlug({ host: process.env.PLUG_IP });

    if (humidity > HUMIDITY_THRESHOLD) {
        if (!await plug.getPowerState()) {
            await plug.setPowerState(true);
            console.log("powered on");
        } else {
            console.log("already on");
        }
    } else {
        if (await plug.getPowerState()) {
            await plug.setPowerState(false);
            console.log("powered off");
        } else {
            console.log("already off");
        }
    }

    await store.write(schemas["device"].measurement, locationTag, { status: await plug.getPowerState() });
})();
