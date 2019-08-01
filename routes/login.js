var express = require('express');
var router = express.Router();

var login = require('../controllers/LoginCtrl');

router.get('/', login.Get);

module.exports = router;