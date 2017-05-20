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
    else {
        User.find({
            where: { email: sess.email }
        }).then(u => {
            UserProduct.findAll({
                where: { user: u.userid }
            }).then(ups => {
                res.json(ups);
            }).catch(err => { res.json({ msg: 'Can\'t find user products', err: err }); });
        }).catch(err => { res.json({ msg: 'Can\'t find user', err: err }); });
    }

    // User.findAll({
    //     include: [{
    //         model: Product
    //     }]
    // }).then(users => {
    //     let result = [];
    //     for (let u of users)
    //         if(u.Products.length >= 1)
    //             for (let up of u.Products)
    //                 result.push(up['UserProducts'])
    //     res.json(result);
    // }).catch(err => {
    //     res.json({ msg: 'Error finding all users...', err: err });
    // });
});

router.post('/request', (req, res) => {
    res.type('json');

    sess = req.session;

    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let id_product = req.body.idProduct;
        if (id_product) {
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
                        else {
                            return UserProduct.create({
                                user: u.userid,
                                status: 'PENDING'
                            }).then(up => {
                                return up.update({
                                    fk_Product: p.productid
                                }).then(() => {
                                    res.json({ msg: 'Add OK' });
                                }).catch(err => { res.json({ msg: 'Error on update to set product', err: err }); });
                            }).catch(err => { res.json({ msg: 'Unable to create a user-product...', err: err }); });
                        }
                    }).catch(err => { res.json({ msg: 'Error getting friend relation', err: err }); });
                }).catch(err => { res.json({ msg: 'Product not found...', err: err }); });
            }).catch(err => { res.json({ msg: 'User not found...', err: err }); });
        } else
            res.json({ msg: 'Bad entry...' });
    }

    // let user_id = parseInt(req.body.user_id);
    // let product_id = parseInt(req.body.product_id);
    //
    // if (user_id && product_id) {
    //     User.findById(user_id).then((user) => {
    //         return Product.findById(product_id).then((product) => {
    //             return user.addProduct(product).then(() => {
    //                 res.json({ msg: 'Assertion ok' });
    //             });
    //         }).catch((err) => {
    //             res.json({msg: 'Error asserting product...', err: err});
    //         });
    //     }).catch((err) => {
    //         res.json({msg: 'Error getting user...', err: err});
    //     });
    // } else
    //     res.json({ msg: 'Bad entry...' });
});
router.get('/pending_request', (req, res) => {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/reminder', (req, res) => {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/edit', (req, res) => {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/external_relationships/create', (req, res) => {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});
router.get('/external_relationships/edit', (req, res) => {
    res.type('json');
    res.json({
        msg: 'ok'
    });
});

module.exports = router;