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
                    Comment: 'U:' + this.user + ' P:' + this.fk_Product + ' => ' + this.text,
                };
            }
        }
    });
    return Comment;
};