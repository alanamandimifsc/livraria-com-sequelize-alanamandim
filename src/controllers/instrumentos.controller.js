const Instrumentos = require('../models/Instrumentos')

class InstrumentosController {
    async criar(req, res) {
        try{
            const dados = req.body
            if(!dados.nome || !dados.tipo_id || !dados.situacao) {
                return res.status(400).json({ message: 'Todos os campos devem ser preenchidos!' })
            }
            const novoInstrumento = await Instrumentos.create(dados)
            return res.status(201).json({
                id: novoInstrumento.id,
                nome: novoInstrumento.nome,
                tipo_id: novoInstrumento.tipo_id,
                situacao: novoInstrumento.situacao
            })
        } catch(error) {~
            console.log(error.name)
            if(error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Ja existe um instrumento com esse nome!' })
            }
            if(error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({ message: 'Tipo de instrumento não encontrado!' })
            }
            if(error.name === 'SequelizeDatabaseError') {
                return res.status(400).json({ message: 'Situação inválida! Escolha entre novo, usado ou quebrado' })
            }
            return res.status(500).json({ message: 'Não foi possível criar o instrumento' })
        }
    }

    async listarTodos(req, res) {
        try {
            const instrumentos = await Instrumentos.findAll({
                attributes: [['id', 'instrumento_id'], 'nome', 'tipo_id', 'situacao'],
                order: [['id', 'DESC']]
            })
            if(instrumentos.length === 0) {
                return res.status(404).json({ message: 'Nenhum instrumento encontrado' })
            }
            return res.status(200).json(instrumentos)
        } catch {
            return res.status(500).json({ message: 'Erro ao buscar os instrumentos' })
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params
            const instrumento = await Instrumentos.findByPk(id)
            if(!instrumento) {
                return res.status(404).json({ message: 'Instrumento não encontrado' })
            }
            return res.status(200).json(instrumento)
        } catch  {
            return res.status(500).json({ message: 'Erro ao buscar o instrumento' })
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params
            const instrumento = await Instrumentos.findByPk(id)
            if(!instrumento) {
                return res.status(404).json({ message: 'Instrumento não encontrado' })
            }
            await instrumento.destroy({ where: { id } })
            return res.status(200).json({ message: `Instrumento com id ${id} deletado com sucesso!` })
        } catch {
            return res.status(500).json({ message: 'Erro ao deletar o instrumento' })
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params
            const dados = req.body
            const instrumento = await Instrumentos.findByPk(id)
            if(!instrumento) {
                return res.status(404).json({ message: 'Instrumento não encontrado' })
            }

            dados.nome ? instrumento.nome = dados.nome : null
            dados.tipo_id ? instrumento.tipo_id = dados.tipo_id : null
            dados.situacao ? instrumento.situacao = dados.situacao : null
            await instrumento.save()
            return res.status(200).json({ message: 'Instrumento atualizado com sucesso!' })
        } catch (error) {
            if(error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Ja existe um instrumento com esse nome!' })
            }
            if(error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({ message: 'Tipo de instrumento não encontrado!' })
            }
            if(error.name === 'SequelizeDatabaseError') {
                return res.status(400).json({ message: 'Situação inválida! Escolha entre novo, usado ou quebrado' })
            }
            return res.status(500).json({ message: 'Erro ao atualizar o instrumento' })
        }
    }
}

module.exports = new InstrumentosController()