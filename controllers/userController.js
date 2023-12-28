
const userService = require('../services/userService')
const JWT = require('../util/JWT')

const userController = {
  addUser: async (req, res) => {
    const { name, password, age } = req.body
    const avatar = req.file ?
      `/uploads/${req.file.filename}.${req.file.mimetype.split('/')[1]}` :
      '/images/default.png'
    await userService.addUser({ name, password, age, avatar})
    res.send({ok: 1})
  },

  updateUser: async (req, res) => {
    const { id, name, password, age } = req.body
    await userService.updateUser({ id, name, password, age })
    res.send({ok: 1})
  },

  getUserList: async (req, res) => {
    const { page, size } = req.query
    const allList = await userService.getUserList()
    const list = allList.slice((page-1)*size, page*size)
    res.send({ok: 1, data: {list, page: Number(page), size: Number(size), total:allList.length }})
  },

  deleteUser: async (req, res) => {
    const { id } = req.body
    await userService.deleteUser(id)
    res.send({ok: 1})
  },

  login: async (req, res) => {
    const { name, password } = req.body
    const users = await userService.login({ name, password })
    if (users.length === 0) {
      res.send({ok: 0 })
    } else {
      const { _id, name } = users[0]
      const token = JWT.generate({ _id, name })
      res.header('Authorization', token)
      res.send({ok: 1 })
    }
  },

  logout: async (req, res) => {
    res.send({ok: 1 })
  }
}

module.exports = userController;
