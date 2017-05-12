'use strict';

let express = require('express');
let router = express.Router();

const models = require('../models');
const User = models.User;

router.get('/edit/:id', function (req, res) {
    res.type('html');

    let id = parseInt(req.params.id) || 0;
    let options = {
        id: id,
    };
    User.find(options).then(function (user) {
        res.render('index', { title: '/edit/' + user.id + ' = ' + user.first_name });
    }).catch(function (err) {
        res.json({
            result: "User not found",
            err: err
        });
    });
});

router.get('/get/:id', function (req, res) {
    res.type('html');

    let id = parseInt(req.params.id) || 0;
    let options = {
        id: id,
    };
    User.find(options).then(function (user) {
        res.render('index', { title: '/get/' + user.id + ' = ' + user.first_name });
    }).catch(function (err) {
        res.json({
            result: "User not found",
            err: err
        });
    });
});

router.get('/contact_us', function (req, res) {
    res.type('html');
    res.render('index', { title: '/contact_us' });
});

module.exports = router;