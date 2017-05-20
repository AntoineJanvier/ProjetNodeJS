'use strict';

const express = require('express');
let router = express.Router();

const models = require('../models');
const User = models.User;
const Product = models.Product;

router.get('/fill_database', (req, res) => {
    let users = [];
    let products = [];
    let cmp = 0;
    let cmp2 = 0;
    /**
     * Generate Users
     */
    User.create({"first_name": "tata", "last_name": "tata", "age": 12, "email": "a@a.com", "pwd": "coucou",
    }).then(function (u) { if(u) { users.push(++cmp); } else { console.log("NOK"); }
    }).catch(function (err) { throw err; });
    User.create({"first_name": "tete", "last_name": "tete", "age": 12, "email": "e@e.com", "pwd": "coucou",
    }).then(function (u) { if(u) { users.push(++cmp); } else { console.log("NOK"); }
    }).catch(function (err) { throw err; });
    User.create({"first_name": "titi", "last_name": "titi", "age": 12, "email": "i@i.com", "pwd": "coucou",
    }).then(function (u) { if(u) { users.push(++cmp); } else { console.log("NOK"); }
    }).catch(function (err) { throw err; });
    let u = User.create({"first_name": "toto", "last_name": "toto", "age": 12, "email": "o@o.com", "pwd": "coucou",
    }).then(function (u) { if(u) { users.push(++cmp); } else { console.log("NOK"); }
    }).catch(function (err) { throw err; });
    User.create({"first_name": "tutu", "last_name": "tutu", "age": 12, "email": "u@u.com", "pwd": "coucou",
    }).then(function (u) { if(u) { users.push(++cmp); } else { console.log("NOK"); }
    }).catch(function (err) { throw err; });
    User.create({"first_name": "tyty", "last_name": "tyty", "age": 12, "email": "y@y.com", "pwd": "coucou",
    }).then(function (u) { if(u) { users.push(++cmp); } else { console.log("NOK"); }
    }).catch(function (err) { throw err; });

    /**
     * Generate products
     */

    Product.create({ name: "Doctor Who", amount: 3, price: 119.99, barecode: "001275468953", User:
        User.find({ "where": { "id": 3 } }).then(user => { u = user; }).catch(err => { console.log('nok' + err); })
    }).then(p => {
        if(p) { cmp2++ } else { console.log("Product not created"); }
    }).catch(err => { throw err; });
    Product.create({ "name": "My Little Poney", "amount": 15, "price": 3.56, "barecode": "016956332552", }).then(function (p) {
        if(p) { products.push(++cmp2); } else { console.log("Product not created"); }
    }).catch(function (err) { throw err; });
    
    res.type('json');
    res.json({
        NumberOfUsersAdded: cmp,
        NumberOfProductsAdded: cmp2
    });
});

module.exports = router;