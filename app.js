const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const express_session = require('express-session');
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');

const models = require('./models');
models.sequelize.sync();

/**
 * Get routes for the application
 * @type {{auth, borrow, friends, notification, personOfInterest, product, timeline, user, wishlist, tests}}
 */
const routes = {
    auth: require('./routes/auth'),
    borrow: require('./routes/borrow'),
    friends: require('./routes/friends'),
    product: require('./routes/product'),
    timeline: require('./routes/timeline'),
    user: require('./routes/user'),
    wishlist: require('./routes/wishlist'),
    tests: require('./routes/tests'),
};

/**
 * Define the 'app' & With express-session, let us store variables like with $_SESSION in PHP
 */
let app = express();
app.use(express_session({
    secret: 'sgQJEPORWgjeogjWPGJGRJwGRMJRMGJdmorj',
    resave: true,
    saveUninitialized: true
}));

/**
 * View engine setup (PUG)
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Icon of application & Middlewares
 */
app.use(favicon(path.join(__dirname, 'public/images', 'icon.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes for the application
 */
app.use('/auth', routes['auth']);
app.use('/borrow', routes['borrow']);
app.use('/friends', routes['friends']);
app.use('/product', routes['product']);
app.use('/timeline', routes['timeline']);
app.use('/user', routes['user']);
app.use('/wishlist', routes['wishlist']);
app.use('/tests', routes['tests']);

/**
 * Throw 404 error when route not found
 */
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
