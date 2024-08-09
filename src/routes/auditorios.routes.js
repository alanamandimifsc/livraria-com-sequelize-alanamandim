const { Router } = require('express')
const AuditoriosController = require('../controllers/auditorios.controller')

const verificarPermissoes = require('../middlewares/verificarPermissoes')

const auditoriosRoutes = Router()

auditoriosRoutes.post('/', verificarPermissoes(['admin']), AuditoriosController.criar)
auditoriosRoutes.get('/', verificarPermissoes(['user']), AuditoriosController.listarTodos)
auditoriosRoutes.get('/:id', verificarPermissoes(['user']), AuditoriosController.listarUm)
auditoriosRoutes.delete('/:id', verificarPermissoes(['admin']), AuditoriosController.deletar)
auditoriosRoutes.put('/:id', verificarPermissoes(['admin']), AuditoriosController.atualizar)

module.exports = auditoriosRoutes