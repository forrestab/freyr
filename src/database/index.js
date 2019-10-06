const Influx = require("influx");

module.exports = {
    createDbClient: (host, database, schema) => {
        return new Influx.InfluxDB({ host, database, schema });
    }
};
