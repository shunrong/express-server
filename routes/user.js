var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

// 用户相关
router.post('/user/add', userController.addUser)
router.post('/user/update', userController.updateUser)
router.get('/user/list', userController.getUserList)
router.post('/user/delete', userController.deleteUser)

// 登录相关
router.post('/login', userController.login)

module.exports = router;
