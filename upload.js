var express = require('express');
var router = express.Router();




router.post('/upload', function (req, res, next) {
        var fs = require('fs');
        // var busboy = require ('busboy');
        console.log('post to upload called');
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldName, oFile, fileName) {
                console.log("Uploading: " + fileName);
                //path where image will be uploaded
                var fStream = fs.createWriteStream(__dirname + '/images/' + fileName);
                oFile.pipe(fStream);
                fStream.on('close', function () {
                        console.log("Upload Finished of " + fileName);
                        res.redirect('back');   //where to go next
                })
        })
});


router.get('/upload', function (req,res) {
        res.render('upload');
        });

module.exports = router;