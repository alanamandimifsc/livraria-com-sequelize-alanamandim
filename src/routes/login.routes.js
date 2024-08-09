const { Router } = require('express')
const LoginController = require('../controllers/login.controller')

const loginRoutes = Router()

loginRoutes.post('/', LoginController.login)

module.exports = loginRoutes