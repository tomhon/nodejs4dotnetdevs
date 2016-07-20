var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var thePlayers = [
    {id: 0, name: 'Walter Payton', sport: 'Football'},
    {id: 1, name: 'Babe Ruth', sport: 'Baseball'},
    {id: 2, name: 'Wayne Gretzky', sport: 'Hockey'},
    {id: 3, name: 'Tiger Woods', sport: 'Golf'},
    {id: 4, name: 'Bobby Orr', sport: 'Hockey'}    
];

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

router.get('/survey', function (req, res) {
    res.render('survey', {
        players: arrPlayers 
    }
    );
});

router.post('/survey', function (req, res) {
    var config = {
        userName: process.env.userName,
        password: process.env.password,
        server:process.env.SQLserver,
        options: {
           encrypt: true, database: process.env.database
        }
    }
    var sInput = req.body.txtInbound;
    console.log(sInput);
    res.send('posted');

    var connection = new Connection(config);
connection.on('connect', function (err) {
    //if no error, then good to go...
    console.log('Connected to SQL Azure ' + config.options.database);
    var TYPES = require('tedious').TYPES;
    var sql = 'insert into tblPlayers (id, firstName, lastName, sport)';
    sql+= 'values (@id, @first, @last, @sport)';
    var request = new Request(sql, function(err) {

    });
    var sFirst = req.body.txtFirst;
    var sLast = req.body.txtLast;
    var sSport = req.body.txtSport;
    var iID = req.body.txtID;

    request.addParameter('id', TYPES.Int, iID);
    request.addParameter('first', TYPES.VarChar, sFirst);
    request.addParameter('last', TYPES.VarChar, sLast);
    request.addParameter('sport', TYPES.VarChar, sSport);
    connection.execSql(request);

    res.send(iID.toString() + ' entered ok');
    
});
connection.on('debug', function (text) {
    console.log('>>>>debug called');
    console.log(text);
});
});




module.exports = router;

