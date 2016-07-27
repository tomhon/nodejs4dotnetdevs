// "use strict"

var express = require('express');

//use the body-parser js library to parse post requests for name/value pairs
var bodyParser = require('body-parser');

var busboy = require('connect-busboy');

//use the memory-cache js library for caching 
var cache = require('memory-cache');

var server = express();
server.use(bodyParser.urlencoded({ extended: true}));

var passport = require('passport');

server.set('views', __dirname + '/views');


server.use(busboy());

//hooks up survey.js
server.use(require('./survey'));
//hooks up details.js 
server.use(require('./details'));

server.use(require('./playerAdmin'));

server.use(require('./newPlayerAdmin'));

server.use(require('./createFile'));

server.use(require('./readFile'));

server.use(require('./upload'));

server.use(require('./login'));

server.set('images', __dirname + '/images');

server.set('view engine', 'ejs');

console.log('settings in place')
console.log(process.env.NODE_ENV);


server.listen(1234, function() {
    console.log("ready on 1234");
});

