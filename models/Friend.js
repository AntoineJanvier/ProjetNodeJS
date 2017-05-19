'use strict';

module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define('Friend', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.STRING
        }
    });
    return Friend;
};