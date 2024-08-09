const { compareSync } = require('bcryptjs')
const Usuarios = require('../models/Usuarios')
const { sign } = require('jsonwebtoken')

class LoginController{
    async login(req, res) {
        try {
            const { email, password} = req.body
        if(!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' })
        }
        const usuario = await Usuarios.findOne({ where: { email } })
        if(!usuario) {
            return res.status(401).json({ message: 'Email ou senha inválidos' })
        }
        const passwordMatch = compareSync(password, usuario.password_hash)
        if(!passwordMatch) {
            return res.status(401).json({ message: 'Email ou senha inválidos' })
        }
        const tokenJWT = sign({
            id: usuario.id,
            nome: usuario.nome
        },
        process.env.JWT_KEY,
        {
            expiresIn: '1d'
        }
    )
        return res.status(200).json({ 
            tokenJWT: tokenJWT,
            id: usuario.id,
            nome: usuario.nome,
            message: 'Login realizado com sucesso!'
         })
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao realizar login' })
        }
    }
}

module.exports = new LoginController()