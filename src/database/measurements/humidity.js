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

const createWritePoint = (location, value) => {
    return {
        measurement: schema.measurement,
        tags: { location },
        fields: { value }
    };
};

module.exports = { schema, createWritePoint };
