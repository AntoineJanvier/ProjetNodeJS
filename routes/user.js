'use strict';

module.exports = function (app) {
    app.get('/edit', function (req, res) {
        res.type('text');
        res.send('/edit');
    });
    app.get('/get', function (req, res) {
        res.type('text');
        res.send('/get');
    });
    app.get('/contact_us', function (req, res) {
        res.type('text');
        res.send('/contact_us');
    });
};