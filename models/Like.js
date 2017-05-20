'use strict';

module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
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
                Like.belongsTo(models.Product, {
                    foreignKey: 'fk_Product'
                });
            }
        },
        instanceMethods: {
            responsify: function() {
                return {
                    User_ID: this.user,
                    Product_ID: this.fk_Product
                };
            }
        }
    });
    return Like;
};