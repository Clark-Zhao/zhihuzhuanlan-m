var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/getip', controller.getip);

module.exports = router;
