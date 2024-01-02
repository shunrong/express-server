var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('chat', { title: '聊天室页面' });
});

module.exports = router;
