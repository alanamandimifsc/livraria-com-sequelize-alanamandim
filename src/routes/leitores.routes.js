const { Router } = require('express')
const LeitoresController = require('../controllers/leitores.controller')

const verificarPermissoes = require('../middlewares/verificarPermissoes')

const leitoresRoutes = Router()

leitoresRoutes.post('/', verificarPermissoes(['admin']), LeitoresController.criar)
leitoresRoutes.get('/', verificarPermissoes(['user']), LeitoresController.listarTodos)
leitoresRoutes.get('/:id', verificarPermissoes(['user']), LeitoresController.listarUm)
leitoresRoutes.delete('/:id', verificarPermissoes(['admin']), LeitoresController.deletar)
leitoresRoutes.put('/:id', verificarPermissoes(['admin']), LeitoresController.atualizar)

module.exports = leitoresRoutes