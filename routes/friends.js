'use strict';

let express = require('express');
let router = express.Router();

const models = require('../models');
const User = models.User;
const Friend = models.Friend;

router.get('/list',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/search',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/remove', (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/join',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/remove',  (req, res) => {
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
                Friend.create({
                    User: u1,
                    Friend: u2
                }).then(f => {
                    res.json({ msg: 'Add friend ok', Friend: f });
                }).catch(err => {
                    res.json({ msg: 'Unable to create a friend relationship...', err: err });
                })
                // u1.addUser(u2, { through: {status: 'Pending'} });

                // return u2.update({
                //     User: u2.User + u1
                // }).then(() => {
                //     res.json({ msg: 'User' + u1.id + ' requested User' + u2.id});
                // }).catch(err => {
                //     res.json({ msg: 'Error while requesting friend from UserA to UserB', err: err});
                // });
            }).catch(err => {
                res.json({ msg: 'UserB not found...', err: err });
            })
        }).catch(err => {
            res.json({ msg: 'UserA not found...', err: err });
        });
    } else
        res.json({ msg: 'Bad entry...' });

});

router.post('/pending_requests',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/pending_requests_count',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/request_decision',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/external_relationships/create',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/external_relationships/edit',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/external_relationships/remove',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});
router.post('/external_relationships/list',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});


/**
 * IF WE HAVE TIME...
 */
router.post('/search_facebook',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});

module.exports = router;