var express = require('express');
var router = express.Router();

var index = require('../controllers/indexCtrl');

router.get('/', index.Get);

module.exports = router;
