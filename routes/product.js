'use strict';

let express = require('express');
let router = express.Router();

router.get('/get', function (req, res) {
    res.type('html');
    res.render('index', { title: '/get' });
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