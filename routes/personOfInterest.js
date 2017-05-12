'use strict';

let express = require('express');
let router = express.Router();

router.get('/list', function (req, res) {
    res.type('html');
    res.render('index', { title: '/list' });
});
router.get('/get', function (req, res) {
    res.type('html');
    res.render('index', { title: '/get' });
});
router.get('/products_relation', function (req, res) {
    res.type('html');
    res.render('index', { title: '/products_relation' });
});

module.exports = router;