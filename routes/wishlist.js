'use strict';

module.exports = function (app) {
    app.get('/add', function (req, res) {
        res.type('text');
        res.send('/add');
    });
    app.get('/list', function (req, res) {
        res.type('text');
        res.send('/list');
    });
    app.get('/remove', function (req, res) {
        res.type('text');
        res.send('/remove');
    });
};