var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/comments', controller.comments);
router.get('/comments/like', controller.like);
router.post('/comments', controller.publish);

module.exports = router;
