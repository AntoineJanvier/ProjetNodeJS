'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            userid: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            first_name: { type: DataTypes.STRING },
            last_name: { type: DataTypes.STRING },
            age: { type: DataTypes.BIGINT },
            email: { type: DataTypes.STRING },
            pwd: { type: DataTypes.STRING },
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
                responsify: () => {
                    return {
                        name: this.first_name + ' ' + this.last_name,
                        email: this.email,
                        age: this.age
                    };
                }
            }
        });
    return User;
};