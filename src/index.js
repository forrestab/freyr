const sensor = require("node-dht-sensor").promises;
const { Client } = require("tplink-smarthome-api");

const { Store } = require("./database");
const schemas = require("./database/measurements");
const { toFahrenheit } = require("./converters/temperature/celcius");

require("dotenv").config();

(async () => {
    const { temperature, humidity } = await sensor.read(process.env.SENSOR_CODE, process.env.GPIO_PORT);
    console.log(`${toFahrenheit(temperature)}F / ${humidity.toFixed(2)}%`);

    const store = new Store({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        schema: Object.values(schemas)
    });
    const locationTag = { location: "basement" };

    await store.write(schemas["temperature"].measurement, { unit: "celcius", ...locationTag }, 
        { value: temperature });
    await store.write(schemas["temperature"].measurement, { unit: "fahrenheit", ...locationTag }, 
        { value: toFahrenheit(temperature) });
    await store.write(schemas["humidity"].measurement, locationTag, { value: humidity });

    const client = new Client();
    const plug = client.getPlug({ host: process.env.PLUG_IP });

    if (humidity > process.env.HUMIDITY_THRESHOLD) {
        if (!await plug.getPowerState()) {
            await plug.setPowerState(true);
        }
    } else {
        if (await plug.getPowerState()) {
            await plug.setPowerState(false);
        }
    }

    await store.write(schemas["device"].measurement, locationTag, { status: await plug.getPowerState() });
})();
