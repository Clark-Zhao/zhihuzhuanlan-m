var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/islogin', controller.isLogin);

module.exports = router;
