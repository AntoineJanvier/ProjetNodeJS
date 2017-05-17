'use strict';

let express = require('express');
let router = express.Router();

const models = require('../models');
const User = models.User;

router.get('/list', function (req, res) {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/search', function (req, res) {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/remove', (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/join', function (req, res) {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/remove', function (req, res) {
    res.type('json');
    res.json({ msg: 'OK' });
});

/**
 * TODO : Test associations User => User (hasMany is preconized in the doc)
 */
router.post('/request', (req, res) => {
    res.type('json');

    let id_u1 = req.body.id_user1;
    let id_u2 = req.body.id_user2;

    if (id_u1 && id_u2) {
        User.find({
            where: { id: id_u1 }
        }).then(u1 => {
            return User.find({
                where: { id: id_u2 }
            }).then(u2 => {
                return u1.update({
                    User: u1.User + u2
                }).then(() => {
                    res.json({ msg: 'User' + u1.id + ' requested User' + u2.id});
                }).catch(err => {
                    res.json({ msg: 'Error while requesting friend from UserA to UserB', err: err});
                });
            }).catch(err => {
                res.json({ msg: 'UserB not found...', err: err });
            })
        }).catch(err => {
            res.json({ msg: 'UserA not found...', err: err });
        });
    } else
        res.json({ msg: 'Bad entry...' });

});

router.post('/pending_requests', function (req, res) {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/pending_requests_count', function (req, res) {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/request_decision', function (req, res) {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/external_relationships/create', function (req, res) {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/external_relationships/edit', function (req, res) {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/external_relationships/remove', function (req, res) {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/external_relationships/list', function (req, res) {
    res.type('json');
    res.json({ msg: 'OK' });
});


/**
 * IF WE HAVE TIME...
 */
router.post('/search_facebook', function (req, res) {
    res.type('json');
    res.json({ msg: 'OK' });
});

module.exports = router;