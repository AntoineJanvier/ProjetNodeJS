'use strict';

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        user: {
            type: DataTypes.BIGINT,
            foreignKey: true
        },
        text: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function (models) {
                Comment.belongsTo(models.Product, {
                    foreignKey: 'fk_Product'
                });
            }
        },
        instanceMethods: {
            responsify: function() {
                return {
                    User_ID: this.user,
                    Product_ID: this.fk_Product,
                    TEXT: this.text
                };
            }
        }
    });
    return Comment;
};