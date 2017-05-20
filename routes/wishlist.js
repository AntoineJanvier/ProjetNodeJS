'use strict';

let express = require('express');
let router = express.Router();

router.get('/add', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});
router.get('/list', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});
router.get('/remove', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});

module.exports = router;