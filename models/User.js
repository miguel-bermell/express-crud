const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const User = dbConnection.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
});

const Car = dbConnection.define("Car", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  model: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
});
User.hasMany(Car);

module.exports = { User, Car };
