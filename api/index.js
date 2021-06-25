const { Videogame, Genre } = require('./src/db')
const server = require('./src/app.js')
const { conn } = require('./src/db.js')
const { v4: uuidv4 } = require('uuid')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console


    var juego = await Videogame.create({
      name: 'AAACustomGAme',
      description: 'sadl;jfasdj',
      rating: '5.0',
      // released:'01/01/2000',
      platforms: 'xbox',
      id: uuidv4(),
    })

    var juego2 = await Videogame.create({
      name: 'ZZZCustomGAme2',
      description: 'sadl;jfasdj',
      rating: '1.0',
      // released:'01/01/2000',
      platforms: 'play',
      id: uuidv4()
    })

    const genreCreated = await Genre.findOrCreate({
      where: { name: 'nuevo' },
      default: {
        name: "nuevo"
      }
    })

    await juego.addGenre(genreCreated[0])
    await juego2.addGenre(genreCreated[0])




  })
})
