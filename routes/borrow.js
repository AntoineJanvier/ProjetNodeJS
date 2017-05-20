'use strict';

let express = require('express');
let router = express.Router();

const models = require('../models');
const User = models.User;
const Product = models.Product;


router.get('/list', (req, res) => {
    res.type('json');
    User.findAll({
        include: [{
            model: Product
        }]
    }).then(users => {
        let result = [];
        for (let u of users)
            if(u.Products.length >= 1)
                for (let up of u.Products)
                    result.push(up['UserProducts'])
        res.json(result);
    }).catch(err => {
        res.json({ msg: 'Error finding all users...', err: err });
    });
});

router.post('/request', (req, res) => {
    res.type('json');

    let user_id = parseInt(req.body.user_id);
    let product_id = parseInt(req.body.product_id);

    if (user_id && product_id) {
        User.findById(user_id).then((user) => {
            return Product.findById(product_id).then((product) => {
                return user.addProduct(product).then(() => {
                    res.json({ msg: 'Assertion ok' });
                });
            }).catch((err) => {
                res.json({msg: 'Error asserting product...', err: err});
            });
        }).catch((err) => {
            res.json({msg: 'Error getting user...', err: err});
        });
    } else
        res.json({ msg: 'Bad entry...' });
});
router.get('/pending_request', (req, res) => {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/reminder', (req, res) => {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/edit', (req, res) => {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/external_relationships/create', (req, res) => {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/external_relationships/edit', (req, res) => {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});

module.exports = router;