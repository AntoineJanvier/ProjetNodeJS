'use strict';

let express = require('express');
let router = express.Router();
let session = require('express-session');

const models = require('../models');
const User = models.User;
const Like = models.Like;
const Product = models.Product;

let sess;

router.post('/create', (req, res) => {
    res.type('json');

    sess = req.session;

    let p_name = req.body.name;
    let p_amount = req.body.amount;
    let p_price = parseFloat(req.body.price);
    let p_barecode = req.body.barecode;

    if(p_name && p_amount && p_price && p_barecode) {
        Product.find({
            where: { barecode: p_barecode }
        }).then(product => {
            if(product) {
                res.json({ msg: 'Product already created...', err: {} });
            } else {
                Product.create({
                    name: p_name, amount: p_amount, price: p_price, barecode: p_barecode
                }).then(p => {
                    if(p)
                        res.json({ Product: p.responsify() });
                    else
                        res.json({ error: 'Error while creating product' });
                }).catch(err => { throw err; });
            }
        }).catch(err => { res.json({ error: 'Error...', err: err }); });
    } else
        res.json({ msg: 'Bad entry...' });
});

router.post('/get', (req, res) => {
    res.type('json');
    let id_product = parseInt(req.body.id) || 0;
    Product.find({
        where: { productid: id_product }
    }).then(product => {
        res.json(product);
    }).catch(err => { res.json({ msg: "Product not found", err: err }); });
});

router.get('/list', (req, res) => {
    res.type('json');

    Product.findAll().then(products => {
        let resp = [];
        for (let p of products)
            resp.push(p.responsify())
        res.json(resp);
    }).catch(err => {
        res.json({msg: "Products not found", err: err });
    });
});

router.get('/random', (req, res) => {
    res.type('json');

    Product.count().then(nb => {
        let nb_rand = Math.round(Math.random() * nb);
        nb_rand = nb_rand === 0 ? nb_rand + 1 : nb_rand;

        return Product.findById(nb_rand).then(p => {
            res.json(p);
        }).catch(err => { res.json({ msg: 'Product not found', err: err }); });
    }).catch(err => { res.json({ msg: 'Unable to count products...', err: err }); });
});

router.get('/like', (req, res) => {
    res.type('json');

    sess = req.session;

    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        User.find({
            where: { email: sess.email }
        }).then(u => {
            return Like.findAll({
                where: { user: u.userid }
            }).then(likes => {
                res.json(likes);
            }).catch(err => { res.json({ msg: 'Unable to find Likes', err: err }); });
        }).catch(err => { res.json({ msg: 'Unable to find user', err: err }); });
    }
});

/**
 * TODO : Like a product => Create a 'Like', assign to user_id & product_id
 */
router.post('/like_product', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let p_id = parseInt(req.body.product_id);
        if (p_id) {
            User.find({
                where: { email: sess.email }
            }).then(user => {
                return Product.findById(p_id).then(product => {

                    return Like.find({
                        where: { user: user.userid, fk_Product: product.productid },
                        paranoid: false
                    }).then(l => {
                        if (l) {
                            if (l.deleted_at)
                                return l.restore().then(() => {
                                    res.json({ msg: 'Re-liked' });
                                }).catch(err => { res.json({ msg: 'Unable to unlike', err: err }); });
                            else
                                return l.destroy().then(() => {
                                    res.json({ msg: 'Unliked' });
                                }).catch(err => { res.json({ msg: 'Unable to destroy like', err: err }); });
                        } else
                            return Like.create({
                                user: user.userid, fk_Product: product.productid
                            }).then(l => {
                                res.json({ msg: 'Like created', like: l });
                            }).catch(err => { res.json({ msg: 'Unable to create like', err: err }); });
                    }).catch(err => { res.json({ msg: 'Unable to find like', err: err }); });
                }).catch(err => { res.json({ msg: 'Unable to get product', err: err }); });
            }).catch(err => { res.json({ msg: 'Unable to get user', err: err }); });
        } else
            res.json({ msg: 'Bad entry...' });
    }
});

router.get('/consumption', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});

/**
 * TODO : Search a product within its barecode
 */
router.get('/scan', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});

/**
 * TODO : Find to whom the product belongs
 */
router.get('/ownership', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});

/**
 * TODO : For a product (get by ID), list all comments on it
 */
router.get('/reviews/list', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});

/**
 * TODO : Generate a comment on a product
 */
router.get('/reviews/create', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});

/**
 * TODO : Edit a given reviews of a product
 */
router.get('/reviews/edit', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});

/**
 * TODO : Delete a review of a product
 */
router.get('/reviews/remove', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});

/**
 * TODO : Flag a review of a product as 'Reported'
 */
router.get('/reviews/report', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});

/**
 * TODO : List all categories of products (Books, Musics, etc...)
 */
router.get('/categories/list', (req, res) => {
    res.type('json');
    res.json({ msg: 'ok' });
});

module.exports = router;