var express = require('express');
var router = express.Router();

var thePlayers = [
    {id: 0, name: 'Walter Payton', sport: 'Football'},
    {id: 1, name: 'Babe Ruth', sport: 'Baseball'},
    {id: 2, name: 'Wayne Gretzky', sport: 'Hockey'},
    {id: 3, name: 'Tiger Woods', sport: 'Golf'},
    {id: 4, name: 'Bobby Orr', sport: 'Hockey'}    
];

var image="27032.jpg"
console.log(image);

function Person() {
    this.id = 0;
    this.lastName = "";
    this.firstName = "";
}

function Player () {
    this.prototype = Person;
    this.sport = "";
    this.displayName = function () {
        return (this.lastName + ',' + this.firstName);
    }
}

var arrPlayers = [];
var oPlayer = new Player();
oPlayer.firstName = "Walter";
oPlayer.lastName = "Payton";
oPlayer.sport = "Football";
oPlayer.id = 1;
arrPlayers.push(oPlayer);
var oPlayer = new Player();
oPlayer.firstName = "Bobby";
oPlayer.lastName = "Orr";
oPlayer.sport = "Hockey";
oPlayer.id = 2;
arrPlayers.push(oPlayer);
var oPlayer = new Player();
oPlayer.firstName = "Wayne";
oPlayer.lastName = "Gretzky";
oPlayer.sport = "Hockey";
oPlayer.id = 3;
arrPlayers.push(oPlayer);
var oPlayer = new Player();
oPlayer.firstName = "Babe";
oPlayer.lastName = "Ruth";
oPlayer.sport = "Baseball";
oPlayer.id = 4;
arrPlayers.push(oPlayer);
var oPlayer = new Player();
oPlayer.firstName = "Tiger";
oPlayer.lastName = "Woods";
oPlayer.sport = "Golf";
oPlayer.id = 5;
arrPlayers.push(oPlayer);
console.log('arrPlayers setup');
console.log('arrPlayer length is ' + arrPlayers.length);

router.get('/survey', function (req, res) {
    res.render('survey', {
        image, players: arrPlayers 
    }
    );
});

router.get('/images', function (req, res) {
    res.send('image requested');
});

module.exports = router;

