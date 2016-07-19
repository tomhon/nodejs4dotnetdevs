var express = require('express');
var router = express.Router();

router.get('/details', function(req, res) {
    res.render('details', {
        playerID: req.query.ID,
        name: req.query.Name
    });

});

module.exports = router;