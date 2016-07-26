var express = require('express');
var router = express.Router();

var fs= require('fs');


router.get('/createFile', function (req,res) {
    var sFileName = "helloworldcool.txt";
    var sMsg = 'Yo this is even more cool';
    var status = 'working';
    console.log('creating file');
    fs.writeFile(sFileName, sMsg, function (err) {
        if (err) return console.log(err);
        else {
            res.render('createFile', {
            status: 'Done'
            });
            console.log('file created');
        }
        });

});

module.exports = router;