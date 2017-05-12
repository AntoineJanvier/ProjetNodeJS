'use strict';

let express = require('express');
let router = express.Router();

router.get('/list', function (req, res) {
    res.type('html');
    res.render('index', { title: '/list' });
});
router.get('/request', function (req, res) {
    res.type('html');
    res.render('index', { title: '/request' });
});
router.get('/pending_request', function (req, res) {
    res.type('html');
    res.render('index', { title: '/pending_request' });
});
router.get('/reminder', function (req, res) {
    res.type('html');
    res.render('index', { title: '/reminder' });
});
router.get('/edit', function (req, res) {
    res.type('html');
    res.render('index', { title: '/edit' });
});
router.get('/external_relationships/create', function (req, res) {
    res.type('html');
    res.render('index', { title: '/external_relationships/create' });
});
router.get('/external_relationships/edit', function (req, res) {
    res.type('html');
    res.render('index', { title: '/external_relationships/edit' });
});

module.exports = router;