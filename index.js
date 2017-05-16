'use strict';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const port = 3791;

let app = Express();

const models = require('./models');
models.sequelize.sync({
    force: true
});


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