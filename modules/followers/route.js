var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/followers', controller.followers);

module.exports = router;
