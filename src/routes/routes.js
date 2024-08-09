const { Router } = require('express')
const livrosRoutes = require('./livros.routes')
const leitoresRoutes = require('./leitores.routes')
const instrumentosRoutes = require('./instrumentos.routes')
const auditoriosRoutes = require('./auditorios.routes')
const usuariosRoutes = require('./usuarios.routes')
const loginRoutes = require('./login.routes')
const permissoesRoutes = require('./permissoes.routes')

const validaTokenJWT = require('../middlewares/validaTokenJWT')

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' })
})

routes.use('/login', loginRoutes)

routes.use('/livros', validaTokenJWT, livrosRoutes)
routes.use('/leitores', validaTokenJWT, leitoresRoutes)
routes.use('/instrumentos', validaTokenJWT, instrumentosRoutes)
routes.use('/auditorios', validaTokenJWT, auditoriosRoutes)
routes.use('/usuarios',validaTokenJWT, usuariosRoutes)
routes.use('/permissoes', validaTokenJWT, permissoesRoutes)

module.exports = routes

