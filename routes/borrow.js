'use strict';

let express = require('express');
let router = express.Router();

const models = require('../models');
const User = models.User;
const Product = models.Product;


router.post('/list', (req, res) => {
    res.type('json');
    User.findAll({
        include: [{
            model: Product,

        }]
    }).then(users => {
        let result = [];
        for (let u of users) {
            if(u.Products.length >= 1) {
                for (let up of u.Products) {
                    result.push(up['UserProducts'])
                }
            }
        }
        res.json(result);
    }).catch(err => {
        res.json({
            msg: 'Error finding all users...',
            err: err
        });
    });
});

router.post('/request', (req, res) => {
    res.type('json');

    let user_id = parseInt(req.body.user_id);
    let product_id = parseInt(req.body.product_id);

    User.find({
        where: { id: user_id }
    }).then((user) => {
        return Product.find({
            where: { id: product_id }
        }).then((product) => {
            return user.addProduct(product).then(() => {
                res.json({ msg: 'Assertion ok' });
            });
        }).catch((err) => {
            res.json({msg: 'Error asserting product...', err: err});
        });
    }).catch((err) => {
        res.json({msg: 'Error getting user...', err: err});
    });

});
router.get('/pending_request', function (req, res) {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/reminder', function (req, res) {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/edit', function (req, res) {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/external_relationships/create', function (req, res) {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/external_relationships/edit', function (req, res) {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});

module.exports = router;