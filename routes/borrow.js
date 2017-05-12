'use strict';

module.exports = function (app) {
    app.get('/list', function (req, res) {
        res.type('text');
        res.send('/list');
    });
    app.get('/request', function (req, res) {
        res.type('text');
        res.send('/request');
    });
    app.get('/pending_request', function (req, res) {
        res.type('text');
        res.send('/pending_request');
    });
    app.get('/reminder', function (req, res) {
        res.type('text');
        res.send('/reminder');
    });
    app.get('/edit', function (req, res) {
        res.type('text');
        res.send('/edit');
    });
    app.get('/external_relationships/create', function (req, res) {
        res.type('text');
        res.send('/external_relationships/create');
    });
    app.get('/external_relationships/edit', function (req, res) {
        res.type('text');
        res.send('/external_relationships/edit');
    });
};