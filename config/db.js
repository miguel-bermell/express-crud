const { Sequelize } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  dialectOptions: {
    encrypt: false,
    options: {
      useUTC: false, // for reading from database
    },
  },
});

dbConnection.sync().then(() => console.log("DB Loaded"));

module.exports = dbConnection;
