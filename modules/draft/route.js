var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/get_draft', controller.draft);

router.post('/save_draft', controller.publish);

module.exports = router;
