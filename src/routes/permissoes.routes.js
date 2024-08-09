const { Router } = require("express");
const PermissoesController = require("../controllers/permissoes.controller");

const verificarPermissoes = require("../middlewares/verificarPermissoes");

const permissoesRoutes = Router();

permissoesRoutes.post('/', verificarPermissoes(['admin']), PermissoesController.criar)
permissoesRoutes.get('/', verificarPermissoes(['admin']), PermissoesController.listarTodos)
permissoesRoutes.get('/:id', verificarPermissoes(['admin']), PermissoesController.listarUm)
permissoesRoutes.delete('/:id', verificarPermissoes(['admin']), PermissoesController.deletar)
permissoesRoutes.put('/:id', verificarPermissoes(['admin']), PermissoesController.atualizar)

permissoesRoutes.post('/atribuir-permissao', PermissoesController.atribuirPermissao)

module.exports = permissoesRoutes