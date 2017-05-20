'use strict';

module.exports = (sequelize, DataTypes) => {
    const UserProduct = sequelize.define('UserProduct', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
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
                UserProduct.belongsTo(models.Product, {
                    foreignKey: 'fk_Product'
                });
            }
        },
        instanceMethods: {
            responsify: () => {
                return {};
            }
        }
    });
    return UserProduct;
};