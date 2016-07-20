var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
//use the memory-cache js library for caching 
var cache = require('memory-cache');

var arrPlayers = [];

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

function fetchPlayers() {
    var config = {
        userName: process.env.userName,
        password: process.env.password,
        server:process.env.SQLserver,
        options: {
           encrypt: true, database: process.env.database
                }
        };

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        request = new Request("select * from tblPlayers", function (err, rowCount) {
            if (err) {
                console.log(err);
            } else {
                console.log('Retrieved ' + rowCount + ' rows');
            }
            console.log('Closing Connection');
            connection.close();
            });

        request.on('row', function(columns) {
            var oPlayer = new Player();
            columns.forEach(function(column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    console.log(column.value);
                    switch(column.metadata.colName) {
                        case "firstName": 
                            oPlayer.firstName = column.value;
                            break;
                        case "lastName":
                            oPlayer.lastName = column.value;
                            break;
                        case "sport":
                            oPlayer.sport = column.value;
                            break;
                        case "id":
                            oPlayer.id = column.value;
                            break;
                    }
                }
                });
                arrPlayers.push(oPlayer);
                cache.put("PlayerList", arrPlayers);
            });
        cache.put("PlayerList", arrPlayers);


        request.on('done', function(rowCount, more) {
            console.log(rowCount + ' rows returned');
        });
        connection.execSql(request);
    });
    };

router.post('/playerAdmin', function (req, res) {
    var config = {
        userName: process.env.userName,
        password: process.env.password,
        server:process.env.SQLserver,
        options: {
           encrypt: true, database: process.env.database
        }
    }


    var connection = new Connection(config);

    connection.on('connect', function (err) {
    //if no error, then good to go...
        console.log('Connected to SQL Azure ' + config.options.database);
        var TYPES = require('tedious').TYPES;
        var sql = 'insert into tblPlayers (id, firstName, lastName, sport)';
        sql+= ' values (@id, @first, @last, @sport)';

        var request = new Request(sql, function(err) {

        // var request = new Request("select * from tblPlayers", function (err, rowCount) {


                if (err) {
                    console.log('>>>>error encountered');
                    console.log(err);
                } else {
                    res.redirect('/survey');
                    res.render('survey', {
                        players: cache.get("PlayerList")
                    });
                    res.send('posted');
                }
            });

        connection.close();
        
        var sFirst = req.body.txtFirst;
        var sLast = req.body.txtLast;
        var sSport = req.body.txtSport;
        var iID = req.body.txtID;

        request.addParameter('id', TYPES.Int, iID);
        request.addParameter('first', TYPES.VarChar, sFirst);
        request.addParameter('last', TYPES.VarChar, sLast);
        request.addParameter('sport', TYPES.VarChar, sSport);
        console.log('Adding data ' + iID + sFirst + sLast + sSport +' to SQL');
        connection.execSql(request);
        fetchPlayers();
    
        });

    connection.on('debug', function (text) {
        console.log('>>>>debug called');
        console.log(text);
    });
});

router.get('/playerAdmin', function (req,res) {
    res.render('playerAdmin');
});


module.exports = router;




