'use strict';

module.exports = function (app) {
    app.get('/list', function (req, res) {
        res.type('text');
        res.send('/list');
    });
    app.get('/edit', function (req, res) {
        res.type('text');
        res.send('/edit');
    });
};