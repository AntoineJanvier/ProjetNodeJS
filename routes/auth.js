'use strict';

let express = require('express');
let router = express.Router();
let session = require('express-session');

const models = require('../models');
const User = models.User;

let sess;

router.post('/subscribe', (req, res) => {
    res.type('json');

    let u_email = req.body.email;
    let u_firstname = req.body.first_name;
    let u_lastname = req.body.last_name;
    let u_age = parseInt(req.body.age);
    let u_pwd = req.body.pwd;

    if(u_firstname && u_lastname && u_age && u_email && u_pwd) {
        User.find({
            attributes: ['email'],
            where: {
                email: u_email
            }
        }).then(user => {
            if(user) {
                res.json({
                    msg: 'User already created...',
                    err: {}
                });
            } else {
                User.create({
                    first_name: u_firstname, last_name: u_lastname, age: u_age, email: u_email, pwd: u_pwd
                }).then(u => {
                    if(u) {
                        sess = req.session;

                        sess.first_name = u.first_name;
                        sess.last_name = u.last_name;
                        sess.age = u.age;
                        sess.email = u.email;
                        res.json({ msg: 'User ' + u.first_name + ' ' + u.last_name + ' created',  Session: sess });
                    } else {
                        res.json({ error: 'Error while creating user' });
                    }
                }).catch(err => {
                    throw err;
                });
            }
        }).catch(err => {
            res.json({ error: 'Error...', err: err })
        });
    } else
        res.json({ msg: 'Bad entry...' });
});

router.post('/log_in', function (req, res) {
    res.type('json');

    sess = req.session;

    if (sess.email)
        res.json({ msg: 'Already connected, please disconnect before a new connection...' });

    let u_email = req.body.email;
    let u_pwd = req.body.pwd;

    if(u_email && u_pwd) {
        User.find({
            where: { 'email': u_email, 'pwd': u_pwd }
        }).then(user => {
            if(user) {
                sess.userid = user.userid;
                sess.first_name = user.first_name;
                sess.last_name = user.last_name;
                sess.age = user.age;
                sess.email = user.email;
                res.json({ User: user.responsify(), Session: sess });
            } else {
                res.json({ msg: 'User not found' });
            }
        }).catch(err => {
            res.json({ msg: 'User not found', err: err });
        });
    } else
        res.json({ msg: 'Bad entry...' });
});

/**
 * TODO : Fix bug while already disconnected (Set headers after they are sent)
 */
router.get('/log_out', (req, res) => {
    res.type('json');

    sess = req.session;

    if (!sess.email)
        res.json({ msg: 'Don\'t need to disconnect, you are not connected !' });
    else
        req.session.destroy(err => {
            if(err)
                res.json({ msg: 'Error while trying to disconnect...', err: err });
            else
                res.json({ msg: 'Disconnection OK', });
        });
});

router.post('/password_lost', (req, res) => {
    res.type('json');

    let u_firstname = req.body.first_name;
    let u_lastname = req.body.last_name;
    let u_age = parseInt(req.body.age);
    let u_email = req.body.email;

    if (u_firstname && u_lastname && u_age && u_email) {
        User.find({
            where: {
                first_name: u_firstname, last_name: u_lastname, age: u_age, email: u_email }
        }).then(user => {
            res.json({ msg: 'Verify OK', password: user.pwd })
        }).catch(err => {
            res.json({ msg: 'Couldn\'t find user...', err: err });
        });
    } else
        res.json({ msg: 'Bad entry...' });
});

router.post('/edit_password', (req, res) => {
    res.type('json');

    let u_firstname = req.body.first_name;
    let u_lastname = req.body.last_name;
    let u_age = parseInt(req.body.age);
    let u_email = req.body.email;
    let u_new_password = req.body.new_password;

    if (u_firstname && u_lastname && u_age && u_email && u_new_password) {
        User.find({
            where: {
                first_name: u_firstname, last_name: u_lastname, age: u_age, email: u_email }
        }).then(user => {
            user.update({
                pwd: u_new_password
            }).then(() => {
                res.json({ msg: 'Password updated' });
            }).catch(err => {
                res.json({ msg: 'User not catched', err: err });
            })
        }).catch(err => {
            res.json({ msg: 'Couldn\'t find user...', err: err });
        });
    } else
        res.json({ msg: 'Bad entry...' });
});

/**
 * IF WE HAVE TIME...
 */
router.get('/facebook_connect', function (req, res) {
    res.type('json');
    res.json({ msg: 'ok' });
});

module.exports = router;