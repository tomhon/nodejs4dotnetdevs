var express = require('express');
var router = express.Router();

var fs= require('fs');


router.get('/readFile', function (req,res) {
    var sFileName = "helloworldcool.txt";
    var status = 'working';
    console.log('reading file');
    fs.readFile(sFileName, function (err, fileData) {
        if (err) return console.log(err);
        else {
            res.render('readFile', {
            data: fileData
            });
            console.log('file read');
        }
        });

});

module.exports = router;