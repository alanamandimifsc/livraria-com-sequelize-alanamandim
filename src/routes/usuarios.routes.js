const { Router } = require('express')
const UsuariosController = require('../controllers/usuarios.controller')

const verificarPermissoes = require('../middlewares/verificarPermissoes')

const usuariosRoutes = Router()

usuariosRoutes.post('/', verificarPermissoes(['admin']), UsuariosController.criar)
usuariosRoutes.get('/', verificarPermissoes(['admin']), UsuariosController.listarTodos)
usuariosRoutes.get('/:id', verificarPermissoes(['admin']), UsuariosController.listarUm)
usuariosRoutes.delete('/:id', verificarPermissoes(['admin']), UsuariosController.deletar)
usuariosRoutes.put('/:id', verificarPermissoes(['admin']), UsuariosController.atualizar)

module.exports = usuariosRoutes