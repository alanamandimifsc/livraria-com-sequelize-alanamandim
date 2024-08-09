const Usuarios = require('../models/Usuarios')

class UsuariosController {
    async criar(req, res) {
        try {
            const dados = req.body
            if (!dados.nome || !dados.email || !dados.cpf || !dados.data_nascimento || !dados.password_hash) {
                return res.status(400).json({ message: 'Todos os campos devem ser preenchidos!' })
            }
            const novoUsuario = await Usuarios.create(dados)
            return res.status(201).json({
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                cpf: novoUsuario.cpf,
                data_nascimento: novoUsuario.data_nascimento,
            })
        } catch (error) {
            console.log(error)
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Ja existe um usuario com esse email ou cpf!' })
            }
            if (error.name === 'SequelizeDatabaseError') {
                return res.status(400).json({ message: 'Data de nascimento inválida!' })
            }
            return res.status(500).json({ message: 'Não foi possível criar o usuario' })
        }
    }

    async listarTodos(req, res) {
        try {
            const todosUsuarios = await Usuarios.findAll()
            if (!todosUsuarios) {
                return res.status(404).json({ message: 'Nenhum usuario encontrado!' })
            }
            console.log(todosUsuarios)
            return res.status(200).json(todosUsuarios.map((usuario) => {
                return {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    cpf: usuario.cpf,
                    data_nascimento: usuario.data_nascimento
                }
            }))
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar todos os usuarios' })
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuarios.findByPk(id)
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario não encontrado' })
            }
            return res.status(200).json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                cpf: usuario.cpf,
                data_nascimento: usuario.data_nascimento
            })
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar o usuario' })
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuarios.findByPk(id)
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario não encontrado' })
            }
            await Usuarios.destroy({ where: { id } })
            return res.status(200).json({ message: `Usuario com id ${id} excluído com sucesso!` })
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao excluir o usuario' })
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params
            const dados = req.body
            const usuario = await Usuarios.findByPk(id)
            if(!usuario) {
                return res.status(404).json({ message: 'Usuario não encontrado' })
            }

            dados.nome ? usuario.nome = dados.nome : null
            dados.email ? usuario.email = dados.email : null
            dados.cpf ? usuario.cpf = dados.cpf : null
            dados.data_nascimento ? usuario.data_nascimento = dados.data_nascimento : null
            dados.password_hash ? usuario.password_hash = dados.password_hash : null
            await usuario.save()
            return res.status(200).json({ message: 'Usuario atualizado com sucesso!' })
        } catch (error) {
            console.log(error)
            if(error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Ja existe um usuario com esse email ou cpf!' })
            }
            if(error.name === 'SequelizeDatabaseError') {
                return res.status(400).json({ message: 'Data de nascimento inválida!' })
            }
            return res.status(500).json({ message: 'Erro ao atualizar o usuario' })
        }
    }
}

module.exports = new UsuariosController()