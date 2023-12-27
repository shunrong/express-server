
const userService = require('../services/userService')

const userController = {
  addUser: async (req, res) => {
    const { name, password, age } = req.body
    await userService.addUser({ name, password, age})
    res.send({ok: 1})
  },

  updateUser: async (req, res) => {
    const { id, name, password, age } = req.body
    await userService.updateUser({ id, name, password, age })
    res.send({ok: 1})
  },

  getUserList: async (req, res) => {
    const { page, size } = req.query
    console.log()
    const data = await userService.getUserList({ page, size })
    res.send({ok: 1, data})
  },

  deleteUser: async (req, res) => {
    const { id } = req.body
    await userService.deleteUser(id)
    res.send({ok: 1})
  },
}

module.exports = userController;
