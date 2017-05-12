'use strict';

module.exports = function (app) {
    app.get('/get', function (req, res) {
        res.type('text');
        res.send('/get');
    });
};