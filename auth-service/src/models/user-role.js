const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Role = require('./role');

const UserRole = sequelize.define('user_role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

module.exports = UserRole;
