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
            res.json(p.stringify());
        }).catch(err => {
            res.json({ msg: 'Product not found', err: err });
        });
    }).catch(err => {
        res.json({ msg: 'Unable to count products...', err: err });
    });
});

/**
 * TODO : Find which product the user liked
 */
router.get('/like', (req, res) => {
    res.type('json');

    res.json({ msg: 'ok' });
});

/**
 * TODO : Like a product => Create a 'Like', assign to user_id & product_id
 */
router.post('/like_product', (req, res) => {
    res.type('json');

    let p_id = parseInt(req.body.product_id);

    sess = req.session;

    if (p_id && sess.userid) {
        User.findById(sess.userid).then(user => {
            Product.findById(p_id).then(product => {
                console.log('User: ' + user.first_name + ' Product: ' + product.name);
                Like.create({
                    User: user,
                    Product: product
                }).then(l => {
                    res.json({
                        msg: 'Like created',
                        like: l
                    });
                }).catch(err => {
                    res.json({ msg: 'Unable to create like', err: err });
                });
            }).catch(err => {
                res.json({ msg: 'Unable to get product', err: err });
            });
        }).catch(err => {
            res.json({ msg: 'Unable to get user', err: err });
        });
    } else {
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