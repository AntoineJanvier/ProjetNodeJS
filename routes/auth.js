'use strict';

module.exports = function (app) {
    app.get('/subscribe', function (req, res) {
        res.type('text');
        res.send('/subscribe');
    });
    app.get('/log_in', function (req, res) {
        res.type('text');
        res.send('/log_in');
    });
    app.get('/log_out', function (req, res) {
        res.type('text');
        res.send('/log_out');
    });
    app.get('/password_lost', function (req, res) {
        res.type('text');
        res.send('/password_lost');
    });
    app.get('/edit_password', function (req, res) {
        res.type('text');
        res.send('/edit_password');
    });

    /**
     * IF WE HAVE TIME...
     */
    app.get('/facebook_connect', function (req, res) {
        res.type('text');
        res.send('/facebook_connect');
    });
};