'use strict';

let express = require('express');
let router = express.Router();
let session = require('express-session');

const models = require('../models');
const User = models.User;
const Like = models.Like;
const Product = models.Product;
const UserProduct = models.UserProduct;
const Comment = models.Comment;
const Category = models.Category;

let sess;

router.post('/create', (req, res) => {
    res.type('json');
    sess = req.session;
    let p_name = req.body.name,
        p_amount = req.body.amount,
        p_price = parseFloat(req.body.price),
        p_barecode = req.body.barecode;
    if(p_name && p_amount && p_price && p_barecode)
        Product.find({
            where: { barecode: p_barecode }
        }).then(product => {
            if(product)
                res.json({ msg: 'Product already created...', err: {} });
            else
                Product.create({
                    name: p_name, amount: p_amount, price: p_price, barecode: p_barecode
                }).then(p => {
                    if(p)
                        res.json({ Product: p.responsify() });
                    else
                        res.json({ error: 'Error while creating product' });
                }).catch(err => { throw err; });
        }).catch(err => { res.json({ error: 'Error...', err: err }); });
    else
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
    }).catch(err => { res.json({msg: "Products not found", err: err }); });
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
    else
        User.find({
            where: { email: sess.email }
        }).then(u => {
            return Like.findAll({
                where: { user: u.userid }
            }).then(likes => {
                res.json(likes);
            }).catch(err => { res.json({ msg: 'Unable to find Likes', err: err }); });
        }).catch(err => { res.json({ msg: 'Unable to find user', err: err }); });
});

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


router.post('/scan', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let b = req.body.barecode;
        if (b)
            Product.find({
                where: { barecode: b }
            }).then(p => {
                if (p)
                    return p.update({
                        amount: (p.amount + 1)
                    }).then(() => {
                        res.json({ msg: 'Product added' });
                    }).catch(err => { res.json({ msg: 'Unable to update product', err: err }); });
                else
                    res.json({ msg: 'Product not found / Not referenced' });
            }).catch(err => { res.json({ msg: 'Unable to find product', err: err }); });
        else
            res.json({ msg: 'Bad entry...' });
    }
});

router.post('/ownership', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let p_id = req.body.idProduct;
        if (p_id)
            Product.find({
                where: { productid: p_id }
            }).then(p => {
                if (p)
                    return UserProduct.findAll({
                        where: { fk_Product: p.productid }
                    }).then(ups => {
                        let res_ups = [];
                        for (let up of ups) {
                            if (up.status === 'OWNED')
                                res_ups.push('OWNER: ' + up.user);
                            else
                                res_ups.push('    BORROWER: ' + up.user);
                        }
                        res.json(res_ups);
                    }).catch(err => { res.json({ msg: 'Unable to find UserProducts', err: err }); });
                else
                    res.json({ msg: 'Product not found / Not referenced' });
            }).catch(err => { res.json({ msg: 'Unable to find product', err: err }); });
        else
            res.json({ msg: 'Bad entry...' });
    }
});

router.post('/reviews/list', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let p_id = parseInt(req.body.idProduct);
        if (p_id)
            Comment.findAll({
                where: { fk_Product: p_id }
            }).then(cs => {
                console.log(cs);
                let res_c = [];
                for (let c of cs)
                    res_c.push(c.responsify());
                res.json(res_c);
            }).catch(err => { res.json({ msg: 'Unable to find comments', err: err }); });
        else
            res.json({ msg: 'Bad entry...' });
    }
});

router.post('/reviews/create', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let p_id = req.body.idProduct,
            t = req.body.comment_text;

        if (p_id && t)
            User.find({
                where: { email: sess.email }
            }).then(u => {
                return Comment.create({
                    user: u.userid, fk_Product: p_id, text: t
                }).then(c => {
                    res.json({ msg: 'Comment inserted', comment: c });
                }).catch(err => { res.json({ msg: 'Unable to create comment', err: err }); });
            }).catch(err => { res.json({ msg: 'Unable to find user', err: err }); });
        else
            res.json({ msg: 'Bad entry...' });
    }
});

router.post('/reviews/edit', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let c_id = req.body.idComment,
            t = req.body.comment_text;

        if (c_id && t)
            User.find({
                where: { email: sess.email }
            }).then(u => {
                return Comment.find({
                    where: { id: c_id, user: u.userid }
                }).then(c => {
                    return c.update({
                        text: t
                    }).then(c => {
                        res.json({ msg: 'Comment updated', comment: c });
                    }).catch(err => { res.json({ msg: 'Unable to update comment', err: err }); });
                }).catch(err => { res.json({ msg: 'Unable to find comment', err: err }); });
            }).catch(err => { res.json({ msg: 'Unable to find user', err: err }); });
        else
            res.json({ msg: 'Bad entry...' });
    }
});

router.delete('/reviews/remove', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let c_id = req.body.idComment;
        if (c_id) {
            User.find({
                where: { email: sess.email }
            }).then(u => {
                return Comment.find({
                    where: { id: c_id, user: u.userid }
                }).then(c => {
                    return c.destroy().then(c => {
                        res.json({ msg: 'Comment deleted', comment: c });
                    }).catch(err => { res.json({ msg: 'Unable to delete comment', err: err }); });
                }).catch(err => { res.json({ msg: 'Unable to find comment', err: err }); });
            }).catch(err => { res.json({ msg: 'Unable to find user', err: err }); });
        } else
            res.json({ msg: 'Bad entry...' });
    }
});

router.post('/reviews/report', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else {
        let c_id = req.body.idComment;
        if (c_id)
            Comment.find({
                where: { id: c_id }
            }).then(c => {
                return c.update({
                    reported: true
                }).then(c => {
                    res.json({ msg: 'Comment reported', comment: c });
                }).catch(err => { res.json({ msg: 'Unable to report comment', err: err }); });
            }).catch(err => { res.json({ msg: 'Unable to find comment', err: err }); });
        else
            res.json({ msg: 'Bad entry...' });
    }
});

router.get('/categories/list', (req, res) => {
    res.type('json');
    sess = req.session;
    if (!sess.email)
        res.json({ msg: 'Not connected...' });
    else
        Category.findAll().then(categories => {
            let res_c = [];
            for (let c of categories)
                res_c.push(c.responsify());
            res.json(res_c);
        }).catch(err => { res.json({ msg: 'Unable to find categories', err: err }); });
});

module.exports = router;