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

const createWritePoint = (location, status) => {
    return {
        measurement: schema.measurement,
        tags: { location },
        fields: { status }
    };
};

module.exports = { schema, createWritePoint };
