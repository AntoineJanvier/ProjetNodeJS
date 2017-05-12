'use strict';

let express = require('express');
let router = express.Router();

const models = require('../models');
const User = models.User;

router.get('/subscribe/:firstname/:lastname/:age/:email', function (req, res) {
    res.type('html');
    if(req.params.firstname && req.params.lastname && req.params.age && req.params.email) {
        const user_params = {
            firstname: req.params.firstname,
            lastname: req.params.lastname,
            age: parseInt(req.params.age),
            email: req.params.email
        };
        User.create({
            "first_name": user_params['firstname'],
            "last_name": user_params['lastname'],
            "age": user_params['age'],
            "email": user_params['email'],
        }).then(function (u) {
            if(u) {
                console.log("User created");
                console.log(u.first_name + ' - ' + u.last_name);
                res.render('subscribe', { title: '/subscribe OK', user_to_create: user_params });
            }
        }).catch(function (err) {
            throw err;
        });

    }
});
router.get('/subscribe', function (req, res) {
    res.type('html');
    res.render('subscribe', { title: '/subscribe' });
});
router.get('/log_in', function (req, res) {
    res.type('html');
    res.render('index', { title: '/log_in' });
});
router.get('/log_out', function (req, res) {
    res.type('html');
    res.render('index', { title: '/log_out' });
});
router.get('/password_lost', function (req, res) {
    res.type('html');
    res.render('index', { title: '/password_lost' });
});
router.get('/edit_password', function (req, res) {
    res.type('html');
    res.render('index', { title: '/edit_password' });
});

/**
 * IF WE HAVE TIME...
 */
router.get('/facebook_connect', function (req, res) {
    res.type('html');
    res.render('index', { title: '/facebook_connect' });
});

module.exports = router;