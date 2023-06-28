/* Data models config file */

const dbConfig = require("./config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {    // konfiguracja bazy danych
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Data models
db.tender = require("./tender.js")(sequelize, Sequelize);
db.offer = require("./offer.js")(sequelize, Sequelize);
db.company = require("./company.js")(sequelize, Sequelize);
db.contractingAuthority = require("./contractingAuthority.js")(sequelize, Sequelize);


const foreign_key_opt = {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    foreignKey: {
        allowNull: false
    }
}

// Data models relationships
db.contractingAuthority.hasMany(db.tender, foreign_key_opt);
db.tender.belongsTo(db.contractingAuthority, foreign_key_opt);

db.tender.hasMany(db.offer, foreign_key_opt);
db.offer.belongsTo(db.tender, foreign_key_opt);

db.company.hasMany(db.offer, foreign_key_opt);
db.offer.belongsTo(db.company, foreign_key_opt);

db.sequelize.sync({force: false}) // false - nienadpisuje struktury bazy
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    })

module.exports = db;