var express = require('express')
    ,app = express()
    ,path = require('path');

app.use(express.static('./public'));

app.all('/*', function(req, res) {
    res.sendFile(path.resolve('public/index.html'));
});

module.exports = app;