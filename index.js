'use strict';

const Express = require('express');
const bodyParser = require('body-parser');
const port = 3791;

let app = Express();


/**
 * Middlewares
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Routes
 */
require('./routes')(app);

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