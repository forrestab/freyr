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
const { toFahrenheit } = require("./converters/temperature/celcius");

require("dotenv").config();

const SENSOR_CODE = 22;
const GPIO_PORT = 4;

(async () => {
    const { temperature, humidity } = await sensor.read(SENSOR_CODE, GPIO_PORT);
    const dbClient = createDbClient(process.env.DB_HOST, process.env.DB_NAME, [
        temperatureSchema,
        humiditySchema
    ]);

    try {
        await dbClient.writePoints([
            createTemperatureWritePoint("basement", "celcius", temperature),
            createTemperatureWritePoint("basement", "fahrenheit", toFahrenheit(temperature)),
            createHumidityWritePoint("basement", humidity)
        ]);
    } catch (error) {
        console.log(error);
    }
})();
