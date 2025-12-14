const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;