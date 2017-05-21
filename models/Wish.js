'use strict';

module.exports = (sequelize, DataTypes) => {
    const Wish = sequelize.define('Wish', {
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
                Wish.belongsTo(models.Product, {
                    foreignKey: 'fk_Product'
                });
            }
        },
        instanceMethods: {
            responsify: function() {
                return {
                    Wish: this.user + ' => ' + this.fk_Product
                };
            }
        }
    });
    return Wish;
};