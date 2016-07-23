var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
//use the memory-cache js library for caching 
var cache = require('memory-cache');

var arrPlayers = [];

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
        console.log('playerAdmin.js Connected to SQL Azure ' + config.options.database);
        var TYPES = require('tedious').TYPES;
        var sql = 'insert into tblPlayers (id, firstName, lastName, sport)';
        sql+= ' values (@id, @first, @last, @sport)';

        var request = new Request(sql, function(err) {

                if (err) {
                    console.log('>>>>error encountered');
                    console.log(err);
                } else {
                    console.log('redirecting to Survey');
                    res.redirect('/survey');
                }
            });

        
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




