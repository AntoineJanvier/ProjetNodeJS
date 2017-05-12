'use strict';

let express = require('express');
let router = express.Router();

router.get('/add', function (req, res) {
    res.type('html');
    res.render('index', { title: '/add' });
});
router.get('/list', function (req, res) {
    res.type('html');
    res.render('index', { title: '/list' });
});
router.get('/remove', function (req, res) {
    res.type('html');
    res.render('index', { title: '/remove' });
});

module.exports = router;