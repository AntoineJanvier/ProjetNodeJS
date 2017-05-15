'use strict';

let express = require('express');
let router = express.Router();

const models = require('../models');
const Product = models.Product;

let sess;

/**
 * TODO : Adapt from User to Product
 */
router.post('/create', function (req, res) {
    res.type('json');

    sess = req.session;

    let p_name = req.body.name;
    let p_amount = req.body.amount;
    let p_price = parseFloat(req.body.price);
    let p_barecode = req.body.barecode;

    if(p_name && p_amount && p_price && p_barecode) {
        Product.find({
            "attributes": ['email'],
            "where": {
                "barecode": p_barecode
            }
        }).then(function (user) {
            if(user) {
                res.json({
                    msg: 'Product already created...',
                    err: {}
                });
            } else {
                Product.create({
                    "name": p_name,
                    "amount": p_amount,
                    "price": p_price,
                    "barecode": p_barecode,
                }).then(function (p) {
                    if(p) {
                        console.log("Product created");
                        res.json({
                            Product: p.responsify()
                        });
                    } else {
                        res.json({
                            error: 'Error while creating product'
                        });
                    }
                }).catch(function (err) {
                    throw err;
                });
            }
        }).catch(function (err) {
            res.json({
                error: 'Error...',
                err: err,
            })
        });
    }
});

router.post('/get', function (req, res) {
    res.type('json');

    let id_product = parseInt(req.body.id) || 0;
    Product.find({
        "where": {
            "id": id_product
        }
    }).then(function (product) {
        res.json(product.responsify());
    }).catch(function (err) {
        res.json({
            msg: "Product not found",
            err: err
        });
    });
});

router.get('/list', function (req, res) {
    res.type('json');
    Product.findAll().then(function (products) {
        let resp = [];
        for (let p of products)
            resp.push(p.responsify())
        res.json(resp);
    }).catch(function (err) {
        res.json({
            msg: "Products not found",
            err: err
        });
    });
});

/**
 * TODO : Find how to do a 'SELECT COUNT(id) FROM Product;', + Random() + 'SELECT * FROM Product WHERE id=rand;'
 */
router.get('/random', function (req, res) {
    res.type('html');
    res.render('index', { title: '/random' });
});

/**
 * TODO : Find which product the user liked
 */
router.get('/like', function (req, res) {
    res.type('html');
    res.render('index', { title: '/like' });
});
router.get('/consumption', function (req, res) {
    res.type('html');
    res.render('index', { title: '/consumption' });
});

/**
 * TODO : Search a product within its barecode
 */
router.get('/scan', function (req, res) {
    res.type('html');
    res.render('index', { title: '/scan' });
});

/**
 * TODO : Find to whom the product belongs
 */
router.get('/ownership', function (req, res) {
    res.type('html');
    res.render('index', { title: '/ownership' });
});

/**
 * TODO : For a product (get by ID), list all comments on it
 */
router.get('/reviews/list', function (req, res) {
    res.type('html');
    res.render('index', { title: '/reviews/list' });
});

/**
 * TODO : Generate a comment on a product
 */
router.get('/reviews/create', function (req, res) {
    res.type('html');
    res.render('index', { title: '/reviews/create' });
});

/**
 * TODO : Edit a given reviews of a product
 */
router.get('/reviews/edit', function (req, res) {
    res.type('html');
    res.render('index', { title: '/reviews/edit' });
});

/**
 * TODO : Delete a review of a product
 */
router.get('/reviews/remove', function (req, res) {
    res.type('html');
    res.render('index', { title: '/reviews/remove' });
});

/**
 * TODO : Flag a review of a product as 'Reported'
 */
router.get('/reviews/report', function (req, res) {
    res.type('html');
    res.render('index', { title: '/reviews/report' });
});

/**
 * TODO : List all categories of products (Books, Musics, etc...)
 */
router.get('/categories/list', function (req, res) {
    res.type('html');
    res.render('index', { title: '/categories/list' });
});

module.exports = router;