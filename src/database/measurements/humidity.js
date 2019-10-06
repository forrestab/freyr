const Influx = require("influx");

const schema = {
    measurement: "humidity",
    tags: [
        "deviceId",
        "location"
    ],
    fields: {
        value: Influx.FieldType.FLOAT
    }
};

const createWritePoint = (deviceId, location, value) => {
    return {
        measurement: schema.measurement,
        tags: { deviceId, location },
        fields: { value }
    };
};

module.exports = { schema, createWritePoint };
