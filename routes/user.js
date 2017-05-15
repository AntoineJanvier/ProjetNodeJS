'use strict';

let express = require('express');
let router = express.Router();

const models = require('../models');
const User = models.User;

router.get('/edit/:id', function (req, res) {
    res.type('json');

    let id = parseInt(req.params.id) || 0;
    User.find({
        "where": {
            "id": id
        }
    }).then(function (user) {
        res.json(user.responsify());
    }).catch(function (err) {
        res.json({
            msg: "User not found",
            err: err
        });
    });
});

router.get('/get/:id', function (req, res) {
    res.type('json');

    let id = parseInt(req.params.id) || 0;
    User.find({
        "where": {
            "id": id
        }
    }).then(function (user) {
        res.json(user.responsify());
    }).catch(function (err) {
        res.json({
            msg: "User not found",
            err: err
        });
    });
});

router.get('/all', function (req, res) {
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

router.get('/contact_us', function (req, res) {
    res.type('json');
    res.json({
        msg: 'Contact page',
        contact_mail: 'bloup@bloup.com',
        contact_tel: '0825 666 666',
        hotline: 'Satan'
    });
});

module.exports = router;