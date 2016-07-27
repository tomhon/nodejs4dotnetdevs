var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var arrUsers = [
    {id: 1, username: 'walter', password:'thirtyfour', email: 'emailaddress'},
    {id: 2, username: 'babe', password: 'homerun', email: 'emailaddress'}
    ];

function findByUsername (username) {
    var user;
    return done(null, user)
}

// findByUsername(username, function(err, user) {
//     var user;

//     //match the username / password in whatever way from the array and ...
//     if (err) {return done(err); }
//     if(!user) { return done(null, false, {message: 'Unknown user ' + username }); }
//     if (user.password != password) {return done (null, false, {message: 'Invalid password'}); }
//     return done(null, user);
// });



//routes
router.get('/login', function (req, res) {
    res.render('login');
    });

router.post('/login/local', passport.authenticate('local', function  (req, res) {
    passport.use(new LocalStrategy(({
            usernameField: 'username',
            passwordField: 'password'
        },
        function (sLogin, sPassword, done) {
            findByUsername(sLogin);
        })
    ));
   console.log('redirecting to Survey');
   res.redirect('/survey');
}));

router.post('/login', function (req, res) {
    var sLogin = req.body.txtUsername;
    var sPassword = req.body.txtPassword;
    console.log('logging in user ' + sLogin);
    });




module.exports = router;

