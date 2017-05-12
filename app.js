const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const routes = {
    auth: require('./routes/auth'),
    borrow: require('./routes/borrow'),
    friends: require('./routes/friends'),
    notification: require('./routes/notification'),
    personOfInterest: require('./routes/personOfInterest'),
    product: require('./routes/product'),
    timeline: require('./routes/timeline'),
    user: require('./routes/user'),
    wishlist: require('./routes/wishlist'),
};

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.use('/auth', routes['auth']);
app.use('/borrow', routes['borrow']);
app.use('/friends', routes['friends']);
app.use('/notification', routes['notification']);
app.use('/personOfInterest', routes['personOfInterest']);
app.use('/product', routes['product']);
app.use('/timeline', routes['timeline']);
app.use('/user', routes['user']);
app.use('/wishlist', routes['wishlist']);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
