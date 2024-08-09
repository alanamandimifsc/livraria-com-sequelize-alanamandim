const Permissoes = require('../models/Permissoes')
const Usuarios = require('../models/Usuarios')

function verificarPermissoes(permissoesRequeridas) {
    return async (req, res, next) => {
        try {
            const { id } = req.usuario
            const usuario = await Usuarios.findByPk(id, {
                include: Permissoes,
                through: {
                    attributes: []
                }
            })
            const permissoesDoUsuario = await usuario.permissoes.map(permissao => permissao.descricao )
            const temPermissao = permissoesRequeridas.every(permissao => permissoesDoUsuario.includes(permissao))
            if(!temPermissao) {
                return res.status(403).json({ message: 'Acesso negado' })
            }
            next()
        } catch (error) {
            res.status(500).json({ message: 'Erro ao verificar permissoes' })
        }
    }
}

module.exports = verificarPermissoes