'use strict';

let express = require('express');
let router = express.Router();

const models = require('../models');
const User = models.User;

router.get('/edit/:id', function (req, res) {
    res.type('html');

    let id = parseInt(req.params.id) || 0;
    User.find({
        "where": {
            "id": id
        }
    }).then(function (user) {
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
    User.find({
        "where": {
            "id": id
        }
    }).then(function (user) {
        res.render('user_profile', { title: 'USER PROFILE', user: {
            id: user.id,
            f_n: user.first_name,
            l_n: user.last_name,
            age: user.age,
            email: user.email
        } });
    }).catch(function (err) {
        res.json({
            result: "User not found",
            err: err
        });
    });
});

router.get('/all', function (req, res) {
    res.type('html');
    User.findAll().then(function (users) {
        res.render('user_list', { title: 'LIST OF USERS', users: users});
    }).catch(function (err) {
        res.json({
            result: "User not found",
            err: err
        });
    });
    // res.render('index', { title: '/contact_us' });
});

router.get('/contact_us', function (req, res) {
    res.type('html');
    res.render('index', { title: '/contact_us' });
});

module.exports = router;