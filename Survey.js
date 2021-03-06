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




router.get('/survey', function (req, res) {
    var config = {
        userName: 'whichAdmin',
        password: process.env.password,
        server:process.env.SQLserver,
        options: {
           encrypt: true, database: process.env.database
        }
    }
    
    var arrPlayers = [];
    var connection = new Connection(config);

    connection.on('connect', function (err) {
    //if no error, then good to go...
    
    // start of connection callback
        if (err) {
            console.log('>>>>error encountered');
            console.log(err);
        } else {
            console.log('Survey.js Connected to SQL Azure ' + config.options.database);
            var TYPES = require('tedious').TYPES;
            var sql = 'select * from tblPlayers';
            console.log('calling fetchPlayers');
            fetchPlayers(sql);
        }    
        cache.put("PlayerList", arrPlayers);
    
    // once the connection to SQL server has been established, fetchPlayers initiates the request for data and handles the returned data
    function fetchPlayers(query) {
        console.log('entering fetchPlayers', query);
        var request = new Request(query, function(err) {
    //start of request callback
            if (err) {
                console.log('>>>>error encountered');
                console.log(err);
            } else {
                console.log('>>>>request successfully handled');
                console.log(err);
                res.render('survey', {
                  players: cache.get('PlayerList', arrPlayers) 
                 });
            }
    //         // console.log('closing connection');

    //         // connection.close();
        });
        console.log('request about to execute');
        connection.execSql(request);

//callback handler for data coming from SQL server - parses into arrPlayers and then adds to cache
        request.on('row', function(columns) {
            var oPlayer = new Player();
            columns.forEach(function(column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    // console.log(column.value);
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
                        case "Id":
                            oPlayer.id = column.value;
                            break;
                    }
                }
                });
                arrPlayers.push(oPlayer);
                cache.put("PlayerList", arrPlayers);
            });





        request.on('done', function(rowCount, more) {
            console.log(rowCount + ' rows returned');
        });
        }
        }); 
});



module.exports = router;

