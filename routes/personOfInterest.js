'use strict';

module.exports = function (app) {
    app.get('/list', function (req, res) {
        res.type('text');
        res.send('/list');
    });
    app.get('/get', function (req, res) {
        res.type('text');
        res.send('/get');
    });
    app.get('/products_relation', function (req, res) {
        res.type('text');
        res.send('/products_relation');
    });
};