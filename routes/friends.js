'use strict';

module.exports = function (app) {
    app.get('/list', function (req, res) {
        res.type('text');
        res.send('/list');
    });
    app.get('/search', function (req, res) {
        res.type('text');
        res.send('/search');
    });
    app.get('/remove', function (req, res) {
        res.type('text');
        res.send('/remove');
    });
    app.get('/join', function (req, res) {
        res.type('text');
        res.send('/join');
    });
    app.get('/remove', function (req, res) {
        res.type('text');
        res.send('/remove');
    });
    app.get('/request', function (req, res) {
        res.type('text');
        res.send('/request');
    });
    app.get('/pending_requests', function (req, res) {
        res.type('text');
        res.send('/pending_requests');
    });
    app.get('/pending_requests_count', function (req, res) {
        res.type('text');
        res.send('/pending_requests_count');
    });
    app.get('/request_decision', function (req, res) {
        res.type('text');
        res.send('/request_decision');
    });
    app.get('/external_relationships/create', function (req, res) {
        res.type('text');
        res.send('/external_relationships/create');
    });
    app.get('/external_relationships/edit', function (req, res) {
        res.type('text');
        res.send('/external_relationships/edit');
    });
    app.get('/external_relationships/remove', function (req, res) {
        res.type('text');
        res.send('/external_relationships/remove');
    });
    app.get('/external_relationships/list', function (req, res) {
        res.type('text');
        res.send('/external_relationships/list');
    });


    /**
     * IF WE HAVE TIME...
     */
    app.get('/search_facebook', function (req, res) {
        res.type('text');
        res.send('/search_facebook');
    });
};