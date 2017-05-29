'use strict';

let express = require('express');
let router = express.Router();
let session = require('express-session');

const models = require('../models');
const User = models.User;
const Friend = models.Friend;

let sess;

router.get('/list',  (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else
        User.find({
            where: { email: sess.email }
        }).then(u1 => {
            return Friend.findAll({
                where: { status: 'ACCEPTED', user: u1.userid }
            }).then(friends => {
                let res_friends = [];
                for (let f of friends)
                    res_friends.push(f.fk_User);
                res.json({ NB_OF_FRIENDS: friends.length, friends_ids: res_friends });
            }).catch(err => { res.json({ msg: 'Enable to find friends', err: err }); });
        }).catch(err => { res.json({ msg: 'UserA not found...', err: err }); });
});

router.post('/search',  (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else
        User.find({
            where: { email: sess.email }
        }).then(u1 => {
            let idFriendToSearch = req.body.idFriendToSearch;
            return Friend.find({
                where: { status: 'ACCEPTED', user: u1.userid, fk_User: idFriendToSearch }
            }).then(friend => {
                return User.findById(friend.fk_User).then( u => {
                    res.json(u);
                }).catch(err => { res.json({ msg: 'Can\'t find user (friend)', err: err }); });
            }).catch(err => { res.json({ msg: 'Enable to find friend', err: err }); });
        }).catch(err => { res.json({ msg: 'UserA not found...', err: err }); });
});

router.post('/remove', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let id_user2 = req.body.idUser2;
        if (id_user2)
            User.find({
                where: { email: sess.email }
            }).then(u1 => {
                return User.findById(id_user2).then(u2 => {
                    return Friend.find({
                        where: { user: u1.userid, fk_User: u2.userid }
                    }).then(f => {
                        return f.destroy().then(() => {
                            res.json({ msg: 'Friend removed' });
                        }).catch(err => { res.json({ msg: 'Can\'t update relation...', err: err }); });
                    }).catch(err => { res.json({ msg: 'No relation', err: err }); });
                }).catch(err => { res.json({ msg: 'Error while getting user2', err: err }); });
            }).catch(err => { res.json({ msg: 'UserA not found...', err: err }); });
        else
            res.json({ msg: 'Bad entry...' });
    }
});

/**
 * TODO : Find what /join means here & what to do...
 */
router.post('/join',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});

router.post('/request', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let id_u2 = req.body.id_user2;
        if (id_u2)
            User.find({
                where: { email: sess.email }
            }).then(u1 => {
                return User.find({
                    where: { userid: id_u2 }
                }).then(u2 => {
                    return Friend.find({
                        where: { status: 'PENDING', user: u1.userid, fk_User: u2.userid }
                    }).then(f => {
                        if (f)
                            res.json({ msg: 'You already have requested this user( ' + f.fk_User + ' )' });
                        else
                            return Friend.create({
                                status: "PENDING",
                                user: u1.userid
                            }).then(f => {
                                return f.update({
                                    fk_User: u2.userid
                                }).then(() => {
                                    res.json({ msg: 'Add OK' });
                                }).catch(err => { res.json({ msg: 'Error on update to set user2 (the friend)', err: err }); });
                            }).catch(err => { res.json({ msg: 'Unable to create a friend relationship...', err: err }); });
                    }).catch(err => { res.json({ msg: 'Error getting friend relation', err: err }); });
                }).catch(err => { res.json({ msg: 'UserB not found...', err: err }); });
            }).catch(err => { res.json({ msg: 'UserA not found...', err: err }); });
        else
            res.json({ msg: 'Bad entry...' });
    }
});

router.get('/pending_requests',  (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else
        User.find({
            where: { email: sess.email }
        }).then(u1 => {
            return Friend.findAll({
                where: { status: 'PENDING', user: u1.userid }
            }).then(friends => {
                let res_friends = [];
                for (let f of friends)
                    res_friends.push(f.fk_User);
                res.json({ NB_OF_FRIENDS: friends.length, friends_ids: res_friends });
            }).catch(err => { res.json({ msg: 'Enable to find friends', err: err }); });
        }).catch(err => { res.json({ msg: 'UserA not found...', err: err }); });
});

router.get('/pending_requests_count',  (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else
        User.find({
            where: { email: sess.email }
        }).then(u1 => {
            return Friend.findAll({
                where: { status: 'PENDING', user: u1.userid }
            }).then(friends => {
                res.json({ NB_OF_FRIENDS: friends.length });
            }).catch(err => { res.json({ msg: 'Enable to find friends', err: err }); });
        }).catch(err => { res.json({ msg: 'UserA not found...', err: err }); });
});

router.post('/request_decision',  (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let d = req.body.decision;
        let id_user2 = req.body.idUser2;
        if (d && id_user2) {
            let decision = check_decision(d);
            if (id_user2)
                User.find({
                    where: { email: sess.email }
                }).then(u1 => {
                    return User.findById(id_user2).then(u2 => {
                        return Friend.find({
                            where: { user: u2.userid, fk_User: u1.userid }
                        }).then(f => {
                            return f.update({
                                status: decision
                            }).then(() => {
                                res.json({ msg: 'Decision applied !' });
                            }).catch(err => { res.json({ msg: 'Can\'t update relation...', err: err }); });
                        }).catch(err => { res.json({ msg: 'No relation', err: err }); });
                    }).catch(err => { res.json({ msg: 'Error while getting user2', err: err }); });
                }).catch(err => { res.json({ msg: 'UserA not found...', err: err }); });
        } else
            res.json({ msg: 'Bad entry...' });
    }
});

function check_decision(d) {
    if (d === 'ACCEPTED' || d === 'REJECTED' || d === 'BLOCKED')
        return d;
    else
        return 'REJECTED';
}

/*router.post('/external_relationships/create',  (req, res) => {
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
});*/

/**
 * IF WE HAVE TIME...
 */
router.post('/search_facebook',  (req, res) => {
    res.type('json');
    res.json({ msg: 'OK' });
});

module.exports = router;