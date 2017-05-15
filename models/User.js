'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('User', {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            first_name: {
                type: DataTypes.STRING
            },
            last_name: {
                type: DataTypes.STRING
            },
            age: {
                type: DataTypes.BIGINT
            },
            email: {
                type: DataTypes.STRING
            },
            pwd: {
                type: DataTypes.STRING
            },
        },
        {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    models.User.belongsToMany(models.User, {as: "Relations", through: "Friends"});
                }
            },
            instanceMethods: {
                responsify: function () {
                    return {
                        name: this.first_name + ' ' + this.last_name,
                        age: this.age,
                        email: this.email
                    };
                }
            }
        }
    );
};