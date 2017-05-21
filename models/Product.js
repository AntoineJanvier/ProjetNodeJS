'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
            productid: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            name: { type: DataTypes.STRING },
            amount: { type: DataTypes.BIGINT },
            price: { type: DataTypes.FLOAT },
            barecode: { type: DataTypes.STRING }
        },
        {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    Product.belongsTo(models.Category);
                }
            },
            instanceMethods: {
                responsify: function() {
                    return {
                        name: this.name,
                        stock_price: this.amount + ' x ' + this.price,
                        code: this.barecode,
                    };
                }
            }
        }
    );
    return Product;
};