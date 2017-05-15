'use strict';

let express = require('express');
let router = express.Router();
let passport = require('passport');

const models = require('../models');
const User = models.User;

router.get('/subscribe/:firstname/:lastname/:age/:email/:pwd', function (req, res) {
    res.type('json');
    if(req.params.firstname && req.params.lastname && req.params.age && req.params.email && req.params.pwd) {
        const user_params = {
            firstname: req.params.firstname,
            lastname: req.params.lastname,
            age: parseInt(req.params.age),
            email: req.params.email,
            pwd: req.params.pwd
        };

        User.find({
            "where": {
                "email": user_params['email']
            }
        }).then(function (user) {
            if(user) {
                res.type('html');
                res.render('error', { message: 'User already created', error: {
                    status: 'Error status : Handled',
                    stack: ''
                }});
            } else {
                User.create({
                    "first_name": user_params['firstname'],
                    "last_name": user_params['lastname'],
                    "age": user_params['age'],
                    "email": user_params['email'],
                    "pwd": user_params['pwd'],
                }).then(function (u) {
                    if(u) {
                        console.log("User created");
                        res.json(u.responsify());
                    } else {
                        res.json({
                            error: 'Error while creating user'
                        });
                    }
                }).catch(function (err) {
                    throw err;
                });
            }
        }).catch(function (err) {
            res.json({
                error: 'Error...',
                err: err,
            })
        });
    }
});
router.get('/log_in', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash: true
}), function (req, res) {
    return res.redirect()
});

router.get('/log_in/:email/:pwd', function (req, res) {
    res.type('json');
    let u_email = req.params.email;
    let u_pwd = req.params.pwd;
    if(u_email && u_pwd) {
        User.find({
            where: {
                "email": u_email,
                "pwd": u_pwd
            }
        }).then(function (user) {
            if(user) {
                res.json(user.responsify());
            } else {
                res.json({
                    error: 'User not found'
                });
            }
        }).catch(function (err) {
            res.json({
                msg: 'User not found',
                err: err
            });
        });
    }
});

router.get('/log_out', function (req, res) {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/password_lost', function (req, res) {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});

router.get('/edit_password', function (req, res) {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});

/**
 * IF WE HAVE TIME...
 */
router.get('/facebook_connect', function (req, res) {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});

module.exports = router;