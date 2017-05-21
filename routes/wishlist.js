'use strict';

let express = require('express');
let router = express.Router();
let session = require('express-session');

const models = require('../models');
const User = models.User;
const Product = models.Product;
const Wish = models.Wish;

let sess;

router.post('/add', (req, res) => {
    res.type('json');

    sess = req.session;

    if (!sess.email)
        res.json({ msg: 'You are not connected' });
    else {
        let product_id = req.body.idProduct;
        if (product_id) {
            User.find({
                where: { email: sess.email }
            }).then(u => {
                return Product.find({
                    where: { productid: product_id }
                }).then(p => {
                    return Wish.create({
                        user: u.userid,
                        fk_Product: p.productid
                    }).then(w => {
                        res.json(w.responsify());
                    }).catch(err => { res.json({ catch_msg: 'Unable to create wish', err: err }); });
                }).catch(err => { res.json({ catch_msg: 'Unable to find product', err: err }); });
            }).catch(err => { res.json({ catch_msg: 'Unable to find user', err: err }); });
        } else
            res.json({ msg: 'Bad entry...' });
    }

});
router.get('/list', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'You are not connected' });
    else {
        User.find({
            where: { email: sess.email }
        }).then(u => {
            return Wish.findAll({
                where: { user: u.userid }
            }).then(wishes => {
                let res_wishes = [];
                for (let w of wishes) res_wishes.push(w.responsify());
                res.json(res_wishes);
            }).catch(err => { res.json({ catch_msg: 'Unable to find wishes', err: err }); });
        }).catch(err => { res.json({ catch_msg: 'Unable to find user', err: err }); });
    }
});
router.post('/remove', (req, res) => {
    res.type('json');

    sess = req.session;

    if (!sess.email)
        res.json({ msg: 'You are not connected' });
    else {
        let wish_id = req.body.idWish;
        if (wish_id) {
            Wish.findById(wish_id).then(w => {
                if (w)
                    w.destroy().then(() => {
                        res.json({ msg: 'Wish removed' });
                    }).catch(err => { res.json({ catch_msg: 'Unable to delete wish', err: err }); });
                else
                    res.json({ error_msg: 'Wish not found' });
            }).catch(err => { res.json({ catch_msg: 'Unable to create wish', err: err }); });
        } else
            res.json({ msg: 'Bad entry...' });
    }
});

module.exports = router;