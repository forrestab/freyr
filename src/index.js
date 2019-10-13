const sensor = require("node-dht-sensor").promises;
const fetch = require("node-fetch");

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

    const results = await dbClient.query(`
            select status 
            from device 
            where location='basement'
            order by time desc
            limit 1
        `);
    const deviceStatus = results[0].status;

    if (humidity > HUMIDITY_THRESHOLD) {
        if (!deviceStatus) {
            await fetch(`https://maker.ifttt.com/trigger/${process.env.EVENT_ON}/with/key/${process.env.IFTTT_TOKEN}`, { method: "POST" });
            console.log("sent on ifttt");
        }

        await dbClient.writePoints([
            createDeviceWritePoint("basement", true) // on
        ]);
    } else {
        if (deviceStatus) {
            await fetch(`https://maker.ifttt.com/trigger/${process.env.EVENT_OFF}/with/key/${process.env.IFTTT_TOKEN}`, { method: "POST" });
            console.log("sent off ifttt");
        }

        await dbClient.writePoints([
            createDeviceWritePoint("basement", false) // off
        ]);
    }
})();
