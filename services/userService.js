const UserModel = require('../models/userModel')

const userService = {
  addUser: (user) => {
    return UserModel.create(user)
  },

  updateUser: (user) => {
    const {id, ...rest} = user
    return UserModel.updateOne({_id: id}, rest)
  },

  getUserList: (params) => {
    const { page, size } = params
    return UserModel.find({}, {password: 0}).sort({age: 1}).skip((page -1) * size).limit(size)
  },

  deleteUser: (id) => {
    return UserModel.deleteOne({name: undefined})
  },
}

module.exports = userService