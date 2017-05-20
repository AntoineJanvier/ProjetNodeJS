'use strict';

let express = require('express');
let router = express.Router();

router.get('/list', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});
router.get('/get', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});
router.get('/products_relation', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});

module.exports = router;