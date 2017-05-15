'use strict';

let express = require('express');
let router = express.Router();

router.get('/list', function (req, res) {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/request', function (req, res) {
    res.type('json');
    res.json({
        msg: 'ok'
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