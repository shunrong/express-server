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
    return UserModel.find({}, { password: 0 }).sort({ age: 1 })
  },

  deleteUser: (id) => {
    return UserModel.deleteOne({_id: id})
  },

  login: (user) => {
    return UserModel.find(user)
  }
}

module.exports = userService