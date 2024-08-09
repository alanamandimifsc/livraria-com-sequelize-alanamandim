const Permissoes = require('../models/Permissoes')
const Usuarios = require('../models/Usuarios')

class PermissoesController {
    async criar(req, res) {
        try {
            const dados = req.body
            if (!dados.descricao) {
                return res.status(400).json({ message: 'A descricao deve ser informada!' })
            }
            const novaPermissao = await Permissoes.create(dados)
            return res.status(201).json({
                id: novaPermissao.id,
                descricao: novaPermissao.descricao,
            })
        } catch (error) {
            console.log(error)
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Ja existe uma permissão com essa descrição!' })
            }
            return res.status(500).json({ message: 'Não foi possível criar a permissão' })
        }
    }

    async listarTodos(req, res) {
        try {
            const todasPermissoes = await Permissoes.findAll()
            if (todasPermissoes.length == 0) {
                return res.status(404).json({ message: 'Nenhum permissão encontrada!' })
            }
            return res.status(200).json(todasPermissoes.map((permissoes) => {
                return {
                    id: permissoes.id,
                    descricao: permissoes.descricao,
                }
            }))
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar todas as permissoes' })
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params
            const permissao = await Permissoes.findByPk(id)
            if (!permissao) {
                return res.status(404).json({ message: 'Permissão não encontrada' })
            }
            return res.status(200).json({
                id: permissao.id,
                descricao: permissao.descricao,
            })
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar a permissão' })
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params
            const permissao = await Permissoes.findByPk(id)
            if (!permissao) {
                return res.status(404).json({ message: 'Permissão não encontrada' })
            }
            await Permissoes.destroy({ where: { id } })
            return res.status(200).json({ message: `Permissão com id ${id} excluída com sucesso!` })
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao excluir a permissão' })
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params
            const dados = req.body
            const permissao = await Permissoes.findByPk(id)
            if(!permissao) {
                return res.status(404).json({ message: 'Permissão não encontrada' })
            }

            dados.descricao ? permissao.descricao = dados.descricao : null

            await permissao.save()
            return res.status(200).json({ message: 'Permissão atualizada com sucesso!' })
        } catch (error) {
            console.log(error)
            if(error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Ja existe uma permissão com esse nome' })
            }
            return res.status(500).json({ message: 'Erro ao atualizar a permissão' })
        }
    }

    async atribuirPermissao(req, res){
        try {
            const { usuario_id, permissao_id } = req.body
            const usuario = await Usuarios.findByPk(usuario_id)
            const permissao = await Permissoes.findByPk(permissao_id)
            if(!usuario || !permissao) {
                return res.status(404).json({ message: 'Usuario ou permissão não encontrados' })
            }
            await usuario.addPermissoes(permissao)
            return res.status(200).json({ message: 'Permissão atribuída com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Erro ao atribuir a permissão' })
        }
    }
}

module.exports = new PermissoesController()