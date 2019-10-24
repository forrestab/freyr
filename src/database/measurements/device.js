const Influx = require("influx");

const schema = {
    measurement: "device",
    tags: [
        "location"
    ],
    fields: {
        status: Influx.FieldType.BOOLEAN
    }
};

module.exports = schema;
