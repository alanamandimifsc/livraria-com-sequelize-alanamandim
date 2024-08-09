const { Router } = require('express')
const LivrosController = require('../controllers/livros.controller')

const verificarPermissoes = require('../middlewares/verificarPermissoes')

const livrosRoutes = Router()

livrosRoutes.post('/', verificarPermissoes(['admin']), LivrosController.criar)
livrosRoutes.get('/', verificarPermissoes(['user']) ,LivrosController.listarTodos)
livrosRoutes.get('/:id', verificarPermissoes(['user']) ,LivrosController.listarUm)
livrosRoutes.delete('/:id', verificarPermissoes(['admin']), LivrosController.deletar)
livrosRoutes.put('/:id', verificarPermissoes(['admin']), LivrosController.atualizar)

module.exports = livrosRoutes