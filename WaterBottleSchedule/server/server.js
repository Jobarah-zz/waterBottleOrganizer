const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, '../dist')));

// serve index.html for all remaining routes, in order to leave routing up to angular
app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: __dirname + "/../dist" });
    console.log(__dirname);
});

app.listen(3001, '0.0.0.0');
console.log('server running: 0.0.0.0:3001');