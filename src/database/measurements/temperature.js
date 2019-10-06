const Influx = require("influx");

const schema = {
    measurement: "temperature",
    tags: [
        "deviceId",
        "location",
        "unit"
    ],
    fields: {
        value: Influx.FieldType.FLOAT
    }
};

const createWritePoint = (deviceId, location, unit, value) => {
    return {
        measurement: schema.measurement,
        tags: { deviceId, location, unit },
        fields: { value }
    };
};

module.exports = { schema, createWritePoint };
