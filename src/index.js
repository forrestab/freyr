const sensor = require("node-dht-sensor").promises;

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

    if (humidity > HUMIDITY_THRESHOLD) {
        // todo, check if device is already on
        // todo, if off, send ifttt

        await dbClient.writePoints([
            createDeviceWritePoint("basement", true) // on
        ]);
    } else {
        // todo, check if device is already off
        // todo, if on, send ifttt

        await dbClient.writePoints([
            createDeviceWritePoint("basement", false) // on
        ]);
    }
})();
