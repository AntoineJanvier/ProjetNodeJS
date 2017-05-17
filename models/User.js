'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            id: {
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
                    User.belongsToMany(models.Product, {
                        through: 'UserProducts'
                    });
                    User.belongsToMany(User, {
                        through: 'Friends',
                        as: 'Friends'
                    })
                }
            },
            instanceMethods: {
                responsify: () => {
                    if (this.Product)
                        for(let p of this.Product)
                            p = p.responsify();
                    return {
                        first_name: this.first_name,
                        last_name: this.last_name,
                        age: this.age,
                        email: this.email,
                        products: this.Product
                    };
                }
            }
        });
    return User;
};