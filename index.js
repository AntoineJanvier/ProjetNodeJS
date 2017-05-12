'use strict';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const port = 3791;
const Sequelize = require('sequelize');

let app = Express();

const models = require('./models');
models.sequelize.sync();

/**
 * Icon / Favicon
 */
app.use(favicon(
        path.join(
            __dirname,
            'public',
            'icon.jpg'
        ))
);

/**
 * Middlewares
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

/**
 * Database connection
 */
// let sequelize = new Sequelize('nodejs_project_development', 'root', 'root', {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });

/**
 * Test the connection to the database
 */
// sequelize.authenticate()
//     .then(function() {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(function (err) {
//         console.log('Unable to connect to the database:', err);
//     });

/**
 * Routes
 */
app.use('/auth', require('./routes/auth'));
app.use('/borrow', require('./routes/borrow'));
app.use('/friends', require('./routes/friends'));
app.use('/notifications', require('./routes/notification'));
app.use('/personOfInterest', require('./routes/personOfInterest'));
app.use('/product', require('./routes/product'));
app.use('/timeline', require('./routes/timeline'));
app.use('/user', require('./routes/user'));
app.use('/wishlist', require('./routes/wishlist'));

/**
 * Error on unknown URLs
 */
app.all('*', function (req, res) {
    console.log('404');
    res.sendStatus(404);
});

/**
 * Listen & Handler of the server on a HTTP port
 */
app.listen(port, function () {
    console.log('Server started at port ' + port + '...');
});