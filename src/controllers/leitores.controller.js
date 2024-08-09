const Leitores = require('../models/Leitores')

class LeitoresController {
    async criar(req , res) {
        try {
            const dados = req.body
            if (!dados.nome || !dados.cpf || !dados.data_nascimento) {
                return res.status(400).json({ message: 'Todos os campos devem ser preenchidos!' })
            }
            const novoLeitor = await Leitores.create(dados)
            return res.status(201).json({
                id: novoLeitor.id,
                nome: novoLeitor.nome,
                cpf: novoLeitor.cpf,
                data_nascimento: novoLeitor.data_nascimento
             })
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Ja existe um leitor com esse cpf!' })
            }
            if (error.name === 'SequelizeDatabaseError') {
                return res.status(400).json({ message: 'Data de nascimento inválida!' })
            }
            return res.status(500).json({ message: 'Não foi possível criar o leitor' })
        }
    }

    async listarTodos(req, res) {
        try {
            const leitores = await Leitores.findAll({
                attributes: [['id', 'leitor_id'], 'nome', 'cpf', 'data_nascimento'],
                order: [['id', 'DESC']]
            })
            if (leitores.length === 0) {
                return res.status(404).json({ message: 'Nenhum leitor encontrado' })
            }
            return res.status(200).json(leitores)
        } catch {
            return res.status(500).json({ message: 'Erro ao buscar os leitores' })
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params
            const leitor = await Leitores.findByPk(id)
            if (!leitor) {
                return res.status(404).json({ message: 'Leitor não encontrado' })
            }
            return res.status(200).json(leitor)
        } catch {
            return res.status(500).json({ message: 'Erro ao buscar o leitor' })
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params
            const leitor = await Leitores.findByPk(id)
            if (!leitor) {
                return res.status(404).json({ message: 'Leitor não encontrado' })
            }
            await Leitores.destroy({ where: { id } })
            return res.status(200).json({ message: `Leitor com id ${id} excluído com sucesso!` })
        } catch {
            return res.status(500).json({ message: 'Erro ao deletar o leitor' })
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params
            const dados = req.body
            const leitor = await Leitores.findByPk(id)
            if (!leitor) {
                return res.status(404).json({ message: 'Leitor não encontrado' })
            }

            dados.nome ? leitor.nome = dados.nome : null
            dados.cpf ? leitor.cpf = dados.cpf : null
            dados.data_nascimento ? leitor.data_nascimento = dados.data_nascimento : null
            await leitor.save()
            return res.status(200).json(leitor)
        } catch (error) {
            if (error.name === 'SequelizeDatabaseError') {
                return res.status(400).json({ message: 'Data de nascimento inválida!' })
            }
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Ja existe um leitor com esse cpf!' })
            }
            return res.status(500).json({ message: 'Erro ao atualizar o leitor' })
        }
    }
}

module.exports = new LeitoresController()