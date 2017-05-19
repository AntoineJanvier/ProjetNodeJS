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
            barecode: { type: DataTypes.STRING },
            borrowed: { type: DataTypes.BOOLEAN }
        },
        {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    Product.belongsTo(models.User, {
                        through: "UserProducts"
                    });
                    Product.belongsToMany(models.User, {
                        through: 'Like',
                    })
                }
            },
            instanceMethods: {
                responsify: () => {
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
    return Product;
};