const express = require('express');

let app = express();

app.on('mount', parent => {
    console.debug('Routes mounted');
});

app.use('/app/', require('./app'));

app.use((err, req, res, next) => {

    console.error(
        `Error ${(err.status || 'unknown error')} URL: ${req.method} ${req.path}
        \t\t\t\t\t message: ${JSON.stringify(err.description)} 
        \t\t\t\t\t body: ${JSON.stringify(req.body || {}).substring(0, 200)}
        \t\t\t\t\t query: ${JSON.stringify(req.query || {})}`
    );

    err.status = err.status || 500;

    res.status(err.status).send(err);
});

module.exports = app;