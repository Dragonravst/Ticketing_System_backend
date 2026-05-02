const { Sequelize } = require('sequelize');
const config = require('../config/config');
const logger = require('./logger');

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        dialect: 'mysql',
        logging: (msg) => logger.debug(msg),
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Test connection
(async () => {
    try {
        await sequelize.authenticate();
        logger.info('Sequelize connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
