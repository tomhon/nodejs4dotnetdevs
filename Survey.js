var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var cache = require('memory-cache');

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
                // res.render('survey', {
                //     players: cache.get("PlayerList")
                // });
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



router.get('/survey', function (req, res) {
    console.log('calling fetchPlayers');
    fetchPlayers(); 
    // while (cache.get('PlayerList') === null) {
    //     console.log('waiting for SQL server response');
    // }
    res.render('survey', {
        players: cache.get('PlayerList', arrPlayers) 
    });
    
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

