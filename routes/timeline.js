'use strict';

let express = require('express');
let router = express.Router();

router.get('/get', function (req, res) {
    res.type('html');
    res.render('index', { title: '/get' });
});

module.exports = router;