const Influx = require("influx");

const schema = {
    measurement: "temperature",
    tags: [
        "location",
        "unit"
    ],
    fields: {
        value: Influx.FieldType.FLOAT
    }
};

const createWritePoint = (location, unit, value) => {
    return {
        measurement: schema.measurement,
        tags: { location, unit },
        fields: { value }
    };
};

module.exports = { schema, createWritePoint };
