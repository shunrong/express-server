var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

router.post('/user/add', userController.addUser)
router.post('/user/update', userController.updateUser)
router.get('/user/list', userController.getUserList)
router.post('/user/delete', userController.deleteUser)

module.exports = router;
