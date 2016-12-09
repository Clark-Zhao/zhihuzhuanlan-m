var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/followers', controller.followers);
router.post('/submitlink', controller.publish);

module.exports = router;
