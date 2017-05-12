'use strict';

let express = require('express');
let router = express.Router();

router.get('/list', function (req, res) {
    res.type('html');
    res.render('index', { title: '/list' });
});
router.get('/edit', function (req, res) {
    res.type('html');
    res.render('index', { title: '/edit' });
});

module.exports = router;