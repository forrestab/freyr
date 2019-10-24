const Influx = require("influx");

const createDbClient = (host, database, schema) => {
    return new Influx.InfluxDB({ host, database, schema });
}

class Store {
    constructor(config) {
        this.db = new Influx.InfluxDB({
            host: config.host,
            database: config.database,
            schema: config.schema
        });
    }

    async write(measurement, tags, data) {
        if (Array.isArray(data)) {
            await this.db.writePoints(
                data.map(fields => { return { measurement, tags, fields }; })
            );
        } else {
            await this.db.writePoints([{ measurement, tags, fields: data }]);
        }
    }
}

module.exports = { createDbClient, Store };
