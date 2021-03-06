var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var arrPlayers = [];

router.post('/newPlayerAdmin', function (req, res) {
    var config = {
        userName: 'whichAdmin',
        password: process.env.password,
        server:process.env.SQLserver,
        options: {
           encrypt: true, database: process.env.database
        }
    }


    var connection = new Connection(config);

    connection.on('connect', function (err) {
    //if no error, then good to go...
        function executeRequest(query) {
            console.log('entering executeRequest', query);
            var request = new Request(query, function(err) {

                if (err) {
                    console.log('>>>>error encountered');
                    console.log(err);
                } else {
                    console.log('>>>>request successfully handled');
                    console.log('redirecting to Survey');
                    res.redirect('/survey');
                }

            });
            console.log('request about to execute');
            connection.execSql(request);

    }

        if (err) {
            console.log('>>>>error encountered');
            console.log(err);
        } else {
            console.log('playerAdmin.js Connected to SQL Azure ' + config.options.database);
            var TYPES = require('tedious').TYPES;
            var sql = 'insert into tblPlayers (id, firstName, lastName, sport)';
            // sql+= ' values (@id, @first, @last, @sport)';
            sql+= ' values (' ;
            sql+= req.body.txtID + ",'";
            sql+= req.body.txtFirst + "','";
            sql+= req.body.txtLast + "','";
            sql+= req.body.txtSport;
            sql+= "')";
            // request.addParameter('id', TYPES.Int, iID);
            // request.addParameter('first', TYPES.VarChar, sFirst);
            // request.addParameter('last', TYPES.VarChar, sLast);
            // request.addParameter('sport', TYPES.VarChar, sSport);
            console.log('Adding data to SQL');
            executeRequest(sql);

        }
   
        });
// //verbose details of SQL connection
//     connection.on('debug', function (text) {
//         console.log('>>>>debug called');
//         console.log(text);
//     });

    connection.on('end', function (text) {
        console.log('>>>>Tedious end event called');
        console.log(text);
    });

});

router.get('/newPlayerAdmin', function (req,res) {
    res.render('newPlayerAdmin');
});


module.exports = router;




