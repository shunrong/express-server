var express = require('express');
var router = express.Router();
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`) 
  }
})
var upload = multer({ storage })
const userController = require('../controllers/userController')

// 用户相关
router.post('/user/add', upload.single('avatar'), userController.addUser)
router.post('/user/update', userController.updateUser)
router.get('/user/list', userController.getUserList)
router.post('/user/delete', userController.deleteUser)

// 登录相关
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router;
