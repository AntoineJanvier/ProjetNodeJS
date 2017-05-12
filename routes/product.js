'use strict';

module.exports = function (app) {
    app.get('/get', function (req, res) {
        res.type('text');
        res.send('/get');
    });
    app.get('/list', function (req, res) {
        res.type('text');
        res.send('/list');
    });
    app.get('/random', function (req, res) {
        res.type('text');
        res.send('/random');
    });
    app.get('/like', function (req, res) {
        res.type('text');
        res.send('/like');
    });
    app.get('/consumption', function (req, res) {
        res.type('text');
        res.send('/consumption');
    });
    app.get('/scan', function (req, res) {
        res.type('text');
        res.send('/scan');
    });
    app.get('/ownership', function (req, res) {
        res.type('text');
        res.send('/ownership');
    });
    app.get('/reviews/list', function (req, res) {
        res.type('text');
        res.send('/reviews/list');
    });
    app.get('/reviews/create', function (req, res) {
        res.type('text');
        res.send('/reviews/create');
    });
    app.get('/reviews/edit', function (req, res) {
        res.type('text');
        res.send('/reviews/edit');
    });
    app.get('/reviews/remove', function (req, res) {
        res.type('text');
        res.send('/reviews/remove');
    });
    app.get('/reviews/report', function (req, res) {
        res.type('text');
        res.send('/reviews/report');
    });
    app.get('/categories/list', function (req, res) {
        res.type('text');
        res.send('/categories/list');
    });
};