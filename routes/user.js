'use strict';

const User = require('../models/User');

module.exports = function (app) {
    app.get('/edit', function (req, res) {
        res.type('text');
        res.send('/edit');
    });

    app.get('/get/:id', function (req, res) {
        res.type('json');

        let id = parseInt(req.params.id) || 0;
        let options = {
            id: id,
        };
        User.findAll(options).then(function (users) {
            let r = [];
            for(let u of users)
                r.push(u.responsify());
            res.json(r);
        }).catch(function (err) {
            res.json({
                result: -1,
                err: err
            });
        });
    });

    app.get('/contact_us', function (req, res) {
        res.type('text');
        res.send('/contact_us');
    });
};