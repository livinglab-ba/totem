var express = require('express');
var router = express.Router();

// Preparing server to provide data from the configuration file
router.get('/config', function(req, res, next) {
    var config = require('getconfig');
    res.json(config);
});

module.exports = router;