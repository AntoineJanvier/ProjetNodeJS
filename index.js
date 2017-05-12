'use strict';

const bodyParser = require('body-parser');
const Express = require('express');
const favicon = require('serve-favicon');
const port = 3791;

let app = Express();

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
app.use(bodyParser.urlencoded({
    extended: true
}));

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

app.all('*', function (req, res) {
    console.log('404');
    res.status(404);
    res.type('text');
    res.send('-> NO WAY!');
});

/**
 * Listen & Handler of the server on a HTTP port
 */
app.listen(port, function () {
    console.log('Server started at port ' + port + '...');
});