const { Router } = require('express')
const InstrumentosController = require('../controllers/instrumentos.controller')

const verificarPermissoes = require('../middlewares/verificarPermissoes')

const instrumentosRoutes = Router()

instrumentosRoutes.post('/', verificarPermissoes(['admin']), InstrumentosController.criar)
instrumentosRoutes.get('/', verificarPermissoes(['user']),InstrumentosController.listarTodos)
instrumentosRoutes.get('/:id', verificarPermissoes(['user']),InstrumentosController.listarUm)
instrumentosRoutes.delete('/:id', verificarPermissoes(['admin']),InstrumentosController.deletar)
instrumentosRoutes.put('/:id', verificarPermissoes(['admin']),InstrumentosController.atualizar)

module.exports = instrumentosRoutes