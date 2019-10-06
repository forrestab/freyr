const sensor = require("node-dht-sensor").promises;

require("dotenv").config();

const SENSOR_CODE = 22;
const GPIO_PORT = 4;

(async () => {
    const { temperature, humidity } = await sensor.read(SENSOR_CODE, GPIO_PORT);
})();
