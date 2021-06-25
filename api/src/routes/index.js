const { Router } = require('express')
// Importar todos los routers;
const videogames = require('./videogames.js')
const videogame = require('./videogame.js')
const genres = require('./genres.js')

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogame', videogame)
router.use('/videogames', videogames)
router.use('/genres', genres)



module.exports = router
