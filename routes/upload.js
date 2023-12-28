var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('upload', { title: '文件上传页' });
});

module.exports = router;
