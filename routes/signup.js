var express = require('express');
var router = express.Router();

var signup = require('../controllers/SignUpCtrl');

router.get('/', signup.Get);

module.exports = router;
