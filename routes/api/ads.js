var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var test = {
        'id': 1,
        'name': "hello"
    };
    res.json(test);
});

module.exports = router;
