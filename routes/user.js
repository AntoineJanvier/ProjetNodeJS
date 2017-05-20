'use strict';

let express = require('express');
let router = express.Router();
let session = require('express-session');

const models = require('../models');
const User = models.User;

let sess;

router.post('/edit', (req, res) => {
    res.type('json');

    sess = req.session;

    if (!sess.email)
        res.json({ msg: 'You are not connected' });
    else {
        let u_email = req.body.email;
        let u_firstname = req.body.first_name;
        let u_lastname = req.body.last_name;
        let u_age = parseInt(req.body.age);
        let u_pwd = req.body.pwd;
        if (u_email === sess.email) {
            res.json({ msg: 'You can\'t modify yourself' });
        } else {
            if(u_firstname && u_lastname && u_age && u_email && u_pwd) {
                User.find({ where: { email: u_email }
                }).then(user => {
                    user.update({
                        first_name: u_firstname,
                        last_name: u_lastname,
                        age: u_age,
                        pwd: u_pwd
                    }).then(u => {
                        res.json({ msg: 'User updated', user: u });
                    }).catch(err => { res.json({ msg: 'Error on update', err: err }); });
                }).catch(err => { res.json({ error: 'Error...', err: err }) });
            } else
                res.json({ msg: 'Bad entry...' });
        }
    }
});

router.post('/get', (req, res) => {
    res.type('json');

    let u_id = parseInt(req.body.id) || 0;

    if (u_id) {
        User.find({
            where: { userid: u_id }
        }).then(user => {
            res.json(user);
        }).catch(err => { res.json({ msg: 'User not found', err: err }); });
    } else
        res.json({ msg: 'Bad entry...' });

});

router.get('/all', (req, res) => {
    res.type('json');
    User.findAll().then(function (users) {
        let resp = [];
        for (let u of users)
            resp.push(u.responsify())
        res.json(resp);
    }).catch(function (err) {
        res.json({
            msg: "Users not found",
            err: err
        });
    });
});

router.get('/contact_us', (req, res) => {
    res.type('json');
    res.json({
        msg: 'Contact page',
        contact_mail: 'bloup@bloup.com',
        contact_tel: '0825 666 666',
        hotline: 'Satan'
    });
});

module.exports = router;