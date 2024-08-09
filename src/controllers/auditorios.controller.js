const Auditorios = require('../models/Auditorios')

class AuditoriosController {

    async criar(req , res) {
        try {
          const dados = req.body
          if(!dados.nome || !dados.qtd_max){
              return res.status(400).json({ message: 'Nome e quantidade maxima devem ser informados' })
          }
          const novoAuditorio = await Auditorios.create(dados)
          return res.status(201).json({
              id: novoAuditorio.id,
              nome: novoAuditorio.nome,
              descricao: novoAuditorio.descricao,
              qtd_max: novoAuditorio.qtd_max
          })
        } catch (error) {
            if(error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Ja existe um auditorio com esse nome!' })
            }
            return res.status(500).json({ message: 'Erro ao criar auditorio' })
        }
    }

    async listarTodos(req, res) {
        try {
            const auditorios = await Auditorios.findAll({
                attributes: [['id', 'auditorio_id'], 'nome', 'descricao', 'qtd_max'],
                order: [['id', 'DESC']]
            })
            if(auditorios.length === 0) {
                return res.status(404).json({ message: 'Nenhum auditorio encontrado' })
            }
            return res.status(200).json(auditorios)
        } catch {
            return res.status(500).json({ message: 'Erro ao listar auditorios' })
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params
            const auditorio = await Auditorios.findByPk(id)
            if(!auditorio) {
                return res.status(404).json({ message: 'Auditorio não encontrado' })
            }
            return res.status(200).json(auditorio)
        } catch {
            return res.status(500).json({ message: 'Erro ao buscar auditorio' })
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params
            const auditorios = await Auditorios.findByPk(id)
            if(!auditorios) {
                return res.status(404).json({ message: 'Auditorio não encontrado' })
            }
            await Auditorios.destroy({ where: { id } })
            return res.status(200).json({ message: `Auditorio com id ${id} excluído com sucesso!` })
        } catch {
            return res.status(500).json({ message: 'Erro ao excluir o auditorio' })
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params
            const dados = req.body
            const auditorio = await Auditorios.findByPk(id)
            if(!auditorio) {
                return res.status(404).json({ message: 'Auditorio não encontrado' })
            }

            dados.nome ? auditorio.nome = dados.nome : null
            dados.descricao ? auditorio.descricao = dados.descricao : null
            dados.qtd_max ? auditorio.qtd_max = dados.qtd_max : null
            await auditorio.save()
            return res.status(200).json(auditorio)
        } catch (error) {
            if(error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Ja existe um auditorio com esse nome!' })
        }
        return res.status(500).json({ message: 'Erro ao atualizar o auditorio' })
        }
    }
}

module.exports = new AuditoriosController()