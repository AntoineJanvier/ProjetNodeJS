'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Product', {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            },
            amount: {
                type: DataTypes.BIGINT
            },
            price: {
                type: DataTypes.FLOAT
            },
            barecode: {
                type: DataTypes.STRING
            },
        },
        {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                }
            },
            instanceMethods: {
                responsify: function () {
                    return {
                        name: this.name,
                        number_in_stock: this.amount,
                        price: this.price,
                        code: this.barecode
                    };
                }
            }
        }
    );
};