var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/post', controller.post);
router.get('/posts', controller.posts);

router.post('/drafts/publish', controller.publish);

module.exports = router;
