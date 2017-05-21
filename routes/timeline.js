'use strict';

let express = require('express');
let router = express.Router();

const models = require('../models');
const User = models.User;
const Comment = models.Comment;
const Like = models.Like;
const Friend = models.Friend;
const UserProduct = models.UserProduct;

const session = require('express-session');

let sess;

router.get('/get', (req, res) => {
    res.type('json');

    sess = req.session;

    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        User.find({
            where: { email: sess.email }
        }).then(u => {
            let res_timeline = { Comments: [], Likes: [], Products: [], Friends: [] };

            // Comments
            return Comment.findAll({
                where: { user: u.userid }
            }).then(comments => {
                for (let c of comments) res_timeline.Comments.push(c.responsify());

                // Likes
                return Like.findAll({
                    where: { user: u.userid }
                }).then(likes => {
                    for (let l of likes) res_timeline.Likes.push(l.responsify());

                    // Friends
                    return Friend.findAll({
                        where: { user: u.userid, status: 'ACCEPTED' }
                    }).then(friends => {
                        for (let f of friends) res_timeline.Friends.push(f.responsify());

                        // Products
                        return UserProduct.findAll({
                            where: { user: u.userid }
                        }).then(ups => {
                            for (let up of ups) res_timeline.Products.push(up.responsify());
                            res.json(res_timeline);
                        }).catch(err => { res.json({ catch_msg: 'Unable to find user products', err: err }); });
                    }).catch(err => { res.json({ catch_msg: 'Unable to find friends', err: err }); });
                }).catch(err => { res.json({ catch_msg: 'Unable to find likes', err: err }); });
            }).catch(err => { res.json({ catch_msg: 'Unable to find comments', err: err }); });
        }).catch(err => { res.json({ catch_msg: 'Unable to find user', err: err }); });
    }
});

module.exports = router;