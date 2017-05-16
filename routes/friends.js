'use strict';

let express = require('express');
let router = express.Router();

const User = require('../models/User');

router.get('/list', function (req, res) {
    res.type('html');
    res.render('index', { title: '/list' });
});
router.get('/search', function (req, res) {

});
router.get('/remove', (req, res) => {
    res.type('json');
    res.json({
        msg: 'ok'
    });

    // let u1 = parseInt(req.body.u1);
    // let u2 = parseInt(req.body.u2);

    // User.find({
    //     where: { id: u1 }
    // }).then(user1 => {
    //     return User.find({
    //         where: { id: u2 }
    //     }).then(user2 => {
    //         return
    //     })
    // })
});
router.get('/join', function (req, res) {
    res.type('html');
    res.render('index', { title: '/join' });
});
router.get('/remove', function (req, res) {
    res.type('html');
    res.render('index', { title: '/remove' });
});
router.get('/request', function (req, res) {
    res.type('html');
    res.render('index', { title: '/request' });
});
router.get('/pending_requests', function (req, res) {
    res.type('html');
    res.render('index', { title: '/pending_requests' });
});
router.get('/pending_requests_count', function (req, res) {
    res.type('html');
    res.render('index', { title: '/pending_requests_count' });
});
router.get('/request_decision', function (req, res) {
    res.type('html');
    res.render('index', { title: '/request_decision' });
});
router.get('/external_relationships/create', function (req, res) {
    res.type('html');
    res.render('index', { title: '/external_relationships/create' });
});
router.get('/external_relationships/edit', function (req, res) {
    res.type('html');
    res.render('index', { title: '/external_relationships/edit' });
});
router.get('/external_relationships/remove', function (req, res) {
    res.type('html');
    res.render('index', { title: '/external_relationships/remove' });
});
router.get('/external_relationships/list', function (req, res) {
    res.type('html');
    res.render('index', { title: '/external_relationships/list' });
});


/**
 * IF WE HAVE TIME...
 */
router.get('/search_facebook', function (req, res) {
    res.type('html');
    res.render('index', { title: '/search_facebook' });
});

module.exports = router;