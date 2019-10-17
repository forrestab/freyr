const sensor = require("node-dht-sensor").promises;
const { Client } = require("tplink-smarthome-api");

const { createDbClient } = require("./database");
const {
    schema: temperatureSchema,
    createWritePoint: createTemperatureWritePoint
} = require("./database/measurements/temperature");
const {
    schema: humiditySchema,
    createWritePoint: createHumidityWritePoint
} = require("./database/measurements/humidity");
const {
    schema: deviceSchema,
    createWritePoint: createDeviceWritePoint
} = require("./database/measurements/device");
const { toFahrenheit } = require("./converters/temperature/celcius");

require("dotenv").config();

const SENSOR_CODE = 22;
const GPIO_PORT = 4;
const HUMIDITY_THRESHOLD = 50; // percent

(async () => {
    const { temperature, humidity } = await sensor.read(SENSOR_CODE, GPIO_PORT);
    console.log(`${toFahrenheit(temperature)}F / ${humidity.toFixed(2)}%`);
    const dbClient = createDbClient(process.env.DB_HOST, process.env.DB_NAME, [
        temperatureSchema,
        humiditySchema,
        deviceSchema
    ]);

    await dbClient.writePoints([
        createTemperatureWritePoint("basement", "celcius", temperature),
        createTemperatureWritePoint("basement", "fahrenheit", toFahrenheit(temperature)),
        createHumidityWritePoint("basement", humidity)
    ]);

    const client = new Client();
    const plug = client.getPlug({ host: process.env.PLUG_IP });

    if (humidity > HUMIDITY_THRESHOLD) {
        if (!await plug.getPowerState()) {
            await plug.setPowerState(true);
            console.log("powered on");
        } else {
            console.log("already on");
        }

        await dbClient.writePoints([
            createDeviceWritePoint("basement", true) // on
        ]);
    } else {
        if (await plug.getPowerState()) {
            await plug.setPowerState(false);
            console.log("powered off");
        } else {
            console.log("already off");
        }

        await dbClient.writePoints([
            createDeviceWritePoint("basement", false) // off
        ]);
    }
})();
