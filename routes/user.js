'use strict';

let s = [];
const models = require('../models');
const User = models.User;

module.exports = function (app) {
    app.get("/user", function (req, res) {
        res.type("html");
        if(req.query.nom && req.query.prenom && req.query.age && req.query.email) {
            addUser(req.query.nom, req.query.prenom, req.query.age, req.query.email);
            res.redirect('/user');
        }
        let ht = '<html><body><ul>';
        let nb = 0;
        for(let p of s) {
            nb++;
            ht += '<li>' + p + '</li>' + '<button onclick="removeUser(' + p.email + ')">Delete</button>';
        }
        ht += '</ul><a href="/user/form2">Add a new user</a></body></html>';
        res.send(ht);
    });
    app.get("/user/form2", function (req, res) {
        res.type("html");
        if(req.query.nom && req.query.prenom && req.query.age && req.query.email) {
            addUser(req.query.nom, req.query.prenom, req.query.age, req.query.email);
            res.redirect('/user');
        } else {
            let h = '<html><body>';
            h+= '<form method="GET" action="">' +
                '<input type="text" placeholder="prenom" name="prenom">' +
                '<input type="text" placeholder="nom" name="nom">' +
                '<input type="number" name="age">' +
                '<input type="text" placeholder="email" name="email">' +
                '<input type="submit" value="OK">' +
                '</form>';
            h += '</body></html>';
            res.send(h);
        }
    });
    app.get("/user/add", function (req, res) {
        res.type('text');
        res.send('ok');
    });
};

function addUser(a, b, c, d) {
    let toAdd = new User({
        nom: a,
        prenom: b,
        age: parseInt(c),
        email: d
    });
    s.push(toAdd);
}
function removeUser(a) {
    for (let p of s)
        if (p.email === a)
            s.splice(s.indexOf(p), 1);
    console.log(s);
}