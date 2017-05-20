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
        },
        user: {
            type: DataTypes.BIGINT,
            foreignKey: true
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function (models) {
                Friend.belongsTo(models.User, {
                    foreignKey: 'fk_User'
                });
            }
        },
        instanceMethods: {
            responsify: () => {
                return {};
            }
        }
    });
    return Friend;
};