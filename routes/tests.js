'use strict';

const express = require('express');
let router = express.Router();

const models = require('../models');
const User = models.User;
const Product = models.Product;
const Friend = models.Friend;
const UserProduct = models.UserProduct;
const Comment = models.Comment;
const Like = models.Like;
const Category = models.Category;

router.get('/fill_database', (req, res) => {
    /**
     * Categories
     */
    Category.create({ name: 'Book' });
    Category.create({ name: 'Music' });
    Category.create({ name: 'Game' });
    Category.create({ name: 'Movie' });

    /**
     * Generate Users
     */
    User.create({first_name: 'tata', last_name: 'tata', age: 12, email: 'a@a.com', pwd: 'coucou' });
    User.create({first_name: 'tete', last_name: 'tete', age: 12, email: 'e@e.com', pwd: 'coucou' });
    User.create({first_name: 'titi', last_name: 'titi', age: 12, email: 'i@i.com', pwd: 'coucou' });
    User.create({first_name: 'toto', last_name: 'toto', age: 12, email: 'o@o.com', pwd: 'coucou' });
    User.create({first_name: 'tutu', last_name: 'tutu', age: 12, email: 'u@u.com', pwd: 'coucou' });
    User.create({first_name: 'tyty', last_name: 'tyty', age: 12, email: 'y@y.com', pwd: 'coucou' });

    /**
     * Generate products
     */
    Product.create({ name: "Doctor Who", amount: 3, price: 119.99, barecode: "001275468953" }).then(p => {
        p.update({
            category_id: 4
        })
    });
    Product.create({ name: "My Little Poney", amount: 15, price: 3.56, barecode: "016956332552" }).then(p => {
        p.update({
            category_id: 1
        })
    });

    /**
     * Friends
     */
    Friend.create({ status: 'ACCEPTED', user: 2, fk_User: 5 });
    Friend.create({ status: 'PENDING', user: 1, fk_User: 5 });

    /**
     * Borrows
     */
    UserProduct.create({ status: 'OWNED', user: 5, fk_Product: 2 });
    UserProduct.create({ status: 'BORROWED', user: 5, fk_Product: 1 });

    /**
     * Comments
     */
    Comment.create({ user: 3, text: 'Bonjour je suis 3', fk_Product: 1 });
    Comment.create({ user: 2, text: 'Moi c\'est 2 !', fk_Product: 1 });
    Comment.create({ user: 2, text: 'Moi c\'est 2 aussi !', fk_Product: 2 });

    /**
     * Likes
     */
    Like.create({ user: 2, fk_Product: 1 });
    Like.create({ user: 2, fk_Product: 2 });
    Like.create({ user: 3, fk_Product: 1 });


    res.type('json');
    res.json({ msg: 'ok' });
});

module.exports = router;