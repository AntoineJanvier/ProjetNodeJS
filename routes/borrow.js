'use strict';

let express = require('express');
let router = express.Router();
let session = require('express-session');

const models = require('../models');
const User = models.User;
const Product = models.Product;
const UserProduct = models.UserProduct;

let sess;

router.get('/list', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected' });
    else
        User.find({
            where: { email: sess.email }
        }).then(u => {
            UserProduct.findAll({
                where: { user: u.userid }
            }).then(ups => {
                res.json(ups);
            }).catch(err => { res.json({ msg: 'Can\'t find user products', err: err }); });
        }).catch(err => { res.json({ msg: 'Can\'t find user', err: err }); });
});

router.post('/request', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let id_product = req.body.idProduct;
        if (id_product)
            User.find({
                where: { email: sess.email }
            }).then(u => {
                return Product.find({
                    where: { productid: id_product }
                }).then(p => {
                    return UserProduct.find({
                        where: { user: u.userid, fk_Product: p.userid }
                    }).then(up => {
                        if (up)
                            res.json({ msg: 'You already have requested this product( ' + up.fk_Product + ' )' });
                        else
                            return UserProduct.create({
                                user: u.userid, status: 'PENDING'
                            }).then(up => {
                                return up.update({
                                    fk_Product: p.productid
                                }).then(() => {
                                    res.json({ msg: 'Add OK' });
                                }).catch(err => { res.json({ msg: 'Error on update to set product', err: err }); });
                            }).catch(err => { res.json({ msg: 'Unable to create a user-product...', err: err }); });
                    }).catch(err => { res.json({ msg: 'Error getting friend relation', err: err }); });
                }).catch(err => { res.json({ msg: 'Product not found...', err: err }); });
            }).catch(err => { res.json({ msg: 'User not found...', err: err }); });
        else
            res.json({ msg: 'Bad entry...' });
    }
});

router.post('/request_accept', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let id_user = req.body.idUser,
            id_product = req.body.idProduct;
        if (id_user && id_product)
            User.find({
                where: { email: sess.email }
            }).then(owner => {
                if (owner)
                    return Product.find({
                        where: { productid: id_product }
                    }).then(p => {
                        if (p)
                            return UserProduct.find({
                                where: { user: owner.userid, fk_Product: p.userid, status: 'PENDING' }
                            }).then(up => {
                                if (up)
                                    return UserProduct.find({
                                        where: { user: id_user, fk_Product: p.userid, status: 'PENDING' }
                                    }).then(up2update => {
                                        if (up2update)
                                            return up2update.update({
                                                status: 'BORROWED'
                                            }).then(() => {
                                                res.json({ msg: 'Borrow accepted' });
                                            }).catch(err => { res.json({ catch_msg: 'Unable to update borrow', err: err }); });
                                        else
                                            res.json({ error_msg: 'UserProduct - Not found' });
                                    }).catch(err => { res.json({ catch_msg: 'Unable to find user product to update', err: err }); });
                                else
                                    res.json({ error_msg: 'UserProduct - Not found' });
                            }).catch(err => { res.json({ msg: 'Error getting friend relation', err: err }); });
                        else
                            res.json({ error_msg: 'Product - Not found' });
                    }).catch(err => { res.json({ msg: 'Product not found...', err: err }); });
                else
                    res.json({ error_msg: 'User - Not found' });
            }).catch(err => { res.json({ msg: 'User not found...', err: err }); });
        else
            res.json({ msg: 'Bad entry...' });
    }
});

router.get('/pending_request', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else
        User.find({
            where: { email: sess.email }
        }).then(user => {
            if (user)
                return UserProduct.findAll({
                    where: { status: 'OWNED', user: user.userid }
                }).then(ups => {
                    if (ups) {
                        let r = [];
                        for (let up of ups) r.push(up.id);
                        return UserProduct.findAll({
                            where: { status: 'PENDING', fk_Product: { $in: r } }
                        }).then(_ups => {
                            for (let _up of _ups) _up = _up.responsify();
                            res.json(_ups);
                        }).catch(err => { res.json({ catch_msg: 'Unable to find UserProducts', err: err }); });
                    } else
                        res.json({ error_msg: 'UserProduct(s) - Not found' });
                }).catch(err => { res.json({ catch_msg: 'Unable to find UserProducts', err: err }); });
            else
                res.json({ error_msg: 'User - Not found' });
        }).catch(err => { res.json({ catch_msg: 'Unable to find user', err: err }); });
});

module.exports = router;