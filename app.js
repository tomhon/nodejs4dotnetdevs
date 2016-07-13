// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World again\n');
// }).listen(1234, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1234/');

// function Person() {
//     this.lastName = "";
//     this.firstName = "";
// }

// function Player() {
//     this.prototype = Person;
//     this.sport = "Football";
//     this.displayName = function () {
//         return(this.lastName + ',' + this.firstName);
//     }
// }

// var oPlayer = new Player();
// oPlayer.firstName = 'Walter';
// oPlayer.lastName = "Payton";
// oPlayer.showAllOfMe = function () {
//     return(this.lastName + ',' + this.firstName + ',' + this.sport);
// }

// console.log(oPlayer.showAllOfMe());
// console.log(oPlayer.displayName());


// function Question(oQuestion, oAllAnswers, oCorrectAnswer) {
//     this.questionText = oQuestion;
//     this.answersList = oAllAnswers;
//     this.correctAnswer = oCorrectAnswer;
// }

"use strict"

var express = require('express');
//use the body-parser js library to parse post requests for name/value pairs
var bodyParser = require('body-parser');

//use the memory-cache js library for caching 
var cache = require('memory-cache');

var server = express();
server.use(bodyParser.urlencoded({ extended: true}));

server.listen(1234, function() {
    console.log("ready on 1234");
});

server.set('views', __dirname + '/views');
//hooks up survey.js
server.use(require('./survey'));
//hooks up details.js 
server.use(require('./details'));
server.set('images', __dirname + '/images');

server.set('view engine', 'ejs');




console.log('settings in place')