const Influx = require("influx");

const schema = {
    measurement: "humidity",
    tags: [
        "location"
    ],
    fields: {
        value: Influx.FieldType.FLOAT
    }
};

module.exports = schema;
