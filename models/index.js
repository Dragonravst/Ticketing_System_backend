const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const logger = require('../utils/logger');

const db = {};
const basename = path.basename(__filename);

// Load all models
fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Run associations
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Sync database
const syncDb = async () => {
    try {
        await sequelize.sync({ force: true });
        logger.info('✅ Database synchronized');
    } catch (error) {
        logger.error('❌ Error synchronizing database:', error);
    }
};

syncDb();

module.exports = db;