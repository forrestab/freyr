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

module.exports = schema;
