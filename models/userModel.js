const mongoose = require('mongoose')

const { model, Schema} = mongoose

const UserModel = model('users', new Schema({
  name: String,
  password: String,
  age: Number
}))

module.exports = UserModel 