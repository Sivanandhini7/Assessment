const { createLogger, transports, format } = require('winston');
require('winston-mongodb');
require('dotenv').config();
const Writable = require("stream").Writable

class MyStream extends Writable {
    write(line) {
        // console.log(line)
        logger.info(line)
    }
}

let writer = new MyStream()

const logger = createLogger({
    transports: [
        new transports.MongoDB({
            level: "info",
            db: process.env.LOGDB,
            collection: "api-logs",
            options: { useUnifiedTopology: true },
            format: format.combine(format.json()),
        }),
    ]
})

module.exports = writer;

