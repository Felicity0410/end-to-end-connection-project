const mongoose = require('mongoose');
const logger = require('./logger');

const connectToDB = () => {
    const connectString = process.env.CONNECTION_STRING
    if(!connectString){
        console.error('connect string is undefined');
        process.exit(1)
    }

    const db = mongoose.connection

    db.on('connected', () => {
        logger.info(`DB connected, ${connectString}`)
    })
    db.on('error', (error) => {
        logger.info(error)
        process.exit(2)
    })
    db.on('disconnected', () => {
        logger.info('db disconnected')
    })

    return mongoose.connect(connectString)
}

module.exports = connectToDB