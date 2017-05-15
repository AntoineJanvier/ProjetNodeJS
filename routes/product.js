'use strict';

let express = require('express');
let router = express.Router();

const models = require('../models');
const Product = models.Product;

router.get('/get/:id', function (req, res) {
    res.type('json');

    let id_product = parseInt(req.params.id) || 0;
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
    res.type('html');
    res.render('index', { title: '/list' });
});
router.get('/random', function (req, res) {
    res.type('html');
    res.render('index', { title: '/random' });
});
router.get('/like', function (req, res) {
    res.type('html');
    res.render('index', { title: '/like' });
});
router.get('/consumption', function (req, res) {
    res.type('html');
    res.render('index', { title: '/consumption' });
});
router.get('/scan', function (req, res) {
    res.type('html');
    res.render('index', { title: '/scan' });
});
router.get('/ownership', function (req, res) {
    res.type('html');
    res.render('index', { title: '/ownership' });
});
router.get('/reviews/list', function (req, res) {
    res.type('html');
    res.render('index', { title: '/reviews/list' });
});
router.get('/reviews/create', function (req, res) {
    res.type('html');
    res.render('index', { title: '/reviews/create' });
});
router.get('/reviews/edit', function (req, res) {
    res.type('html');
    res.render('index', { title: '/reviews/edit' });
});
router.get('/reviews/remove', function (req, res) {
    res.type('html');
    res.render('index', { title: '/reviews/remove' });
});
router.get('/reviews/report', function (req, res) {
    res.type('html');
    res.render('index', { title: '/reviews/report' });
});
router.get('/categories/list', function (req, res) {
    res.type('html');
    res.render('index', { title: '/categories/list' });
});

module.exports = router;