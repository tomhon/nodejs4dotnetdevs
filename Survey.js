var express = require('express');
var router = express.Router();

router.get('/survey', function (req, res) {
    res.send('this is the survey page');
});

module.exports = router;

