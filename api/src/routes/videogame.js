const { Router } = require('express')
const fetch = require("node-fetch")
const { Videogame,Genre } = require('../db')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config();
const key = process.env.API_KEY
// const defaultGame = require('../images/defaultgame.jpg')

const router = Router()

router.get('/:id', async function (req, res) {
    let id = req.params.id
    let videogame = {
        name:'',
        description:'',
        released:'',
        rating:'',
        platforms:[],
        image:''
    }
    // console.log(id)
    let resp = await Videogame.findAll({
        where: {
            name:id
        },
    })
    console.log( )
    if(resp[0]===undefined){
        fetch(`https://api.rawg.io/api/games?search=${id}&key=${key}`)
        .then(response => response.json())
        .then(function (obj) {
            // let genres_list = Object.entries(obj.results)

            videogame.name=obj.results[0].name
            if(obj.results[0].description===undefined){
                videogame.description='has not description'
            } else {
                videogame.description=obj.results[0].description
            }
            videogame.released=obj.results[0].released
            videogame.rating=obj.results[0].rating
            let platforms=obj.results[0].platforms
            videogame.platforms= platforms.map(platform=>platform.platform.name)
            console.log('-------')
            console.log(videogame.platforms)
            videogame.image=obj.results[0].background_image
            res.json(videogame) 
        })
    } else {
        let videogame = {platforms:[]}
        videogame.name=resp[0].dataValues.name
        videogame.description=resp[0].dataValues.description
        videogame.released=resp[0].dataValues.released
        videogame.rating=resp[0].dataValues.rating

        videogame.platforms.push(resp[0].dataValues.platforms)
        console.log(videogame.platforms)
        videogame.image='https://www.tecnologias-informacion.com/sistemast.jpg'
        res.json(videogame)
    }

})


router.post('/', function (req, res) {
    // pname = passed name
    let pname = req.body.name
    let pdescription = req.body.description
    let pplatforms = req.body.platforms
    let prating = req.body.rating
    let preleased = req.body.released
    let pgenre = req.body.genre
    let id = uuidv4()
    async function create(){
        const [videogame, created] = await Videogame.findOrCreate({
            where: { name: pname },
            defaults: {
                id: id,
                name: pname,
                description: pdescription,
                platforms: pplatforms,
                rating: prating,
                // format : YYYY-DD-MM
                released: preleased,
            }
        })
        const genreCreated = await Genre.findOrCreate({
            where: { name: pgenre },
            default: {
                name:pgenre
            }

        })
        await videogame.addGenre(genreCreated[0])
        if(created){
            res.json('Successfully created')
        } else{
            res.json('The game already exist')
        }
    }
    create()
})

router.post('/delete/:game', async function (req, res) {

    let game = req.params.game
    console.log(game)
    let resp = await Videogame.destroy({
        where: {
            name:game
        },
    })
    res.json(resp)
    // ver si se borra la tabla intermedia
})


module.exports = router;