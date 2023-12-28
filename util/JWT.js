var jwt = require('jsonwebtoken');

const secret = 'lime-token-haha';
const JWT = {
  generate(value, expireTime) {
    return jwt.sign(value, secret, { expiresIn: expireTime || '1h'})
  },

  verify(token) {
    try {
      return jwt.verify(token, secret)
    } catch {
      return false
    }
  }
}

// test
// const token = JWT.generate({ name: 'lime', password: 123 })

// console.log(token)
// setTimeout(() => {
//   console.log(JWT.verify(token))
// }, 9000)
// setTimeout(() => {
//   console.log(JWT.verify(token))
// }, 11000)

module.exports = JWT