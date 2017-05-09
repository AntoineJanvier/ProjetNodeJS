'use strict';

let User = function (config) {
    this.nom = config.nom;
    this.prenom = config.prenom;
    this.email = config.email;
    this.age = config.age;
};
User.prototype.toString = function () {
    return this.prenom + ' ' + this.nom + ' ' + this.age + ' ' + this.email;
};

module.exports = User;