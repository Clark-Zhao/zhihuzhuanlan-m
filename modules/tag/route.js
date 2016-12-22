var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.post('/create_tag', controller.createTag);
router.get('/get_post_tags', controller.postTags);

module.exports = router;
