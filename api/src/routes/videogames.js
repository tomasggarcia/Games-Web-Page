const { Router, response } = require('express')
const fetch = require("node-fetch");
const { Videogame,Genre} = require('../db')
// const { ne } = require('sequelize/types/lib/operators');
require('dotenv').config();
const key = process.env.API_KEY

const router = Router()

router.get('/', async function (req, res) {
    let games = []
    let game = req.query.name
    let page = parseInt(req.query.page)
    //   videogames?name=juego




    if (game) {
        fetch(`https://api.rawg.io/api/games?search=${game}&key=${key}`)
            // pasa el response a formato json
            .then(response => response.json())
            .then(function (response) {
                // devuelve un array compuesto por pares de array por cada responseeto en response
                let game_list = responseect.entries(response.results)
                // game list = [[0,{slug:***,name:*** ...}],[1,{slug:***,name:*** ...}]] 

                if (game_list.length > 0) {
                    for (let [key, value] of game_list) {
                        if (key > 14) { break }
                        games.push(value.name);
                    }
                    res.json(games)
                }
                else {

                    // ver si conviene devolver un error
                    res.json('No se encontraron resultados')
                }

            })
    } else {
        (async function initialGet() {

            function handleResponse(input) {
                let games = []
                for (i in input.results) {
                    // console.log(input.results[i].name)
                    let game = {
                        name: input.results[i].name,
                        imgUrl: input.results[i].background_image,
                        genres: [],
                        rating: input.results[i].rating
                    }
                    for (j in input.results[i].genres) {
                        game.genres.push(input.results[i].genres[j].name)
                    }
                    games.push(game)
                }
                return games
            }

            async function a() {
                let next = `https://api.rawg.io/api/games?key=${key}`
                let accumulator = []
                let j = 15
                let response = ''
                // 'i' es la cantidad de paginas que queremos pedir a la api
                for (let i = 0; i < 3; i++) {
                    response = await fetch(next).then(response => response.json())
                    next = response.next
                    // accumulator.push(handleResponse(response))
                    let resp = handleResponse(response)
                    for (j in resp) {
                        accumulator.push(resp[j])

                    }
                }
                let resp = await Videogame.findAll({
                    attributes: ['name', 'description', 'rating'],
                    include: Genre
                })
                console.log('Games in DB')
                // console.log(resp[0].dataValues.name)
                // console.log(resp[0].dataValues.rating)
                // console.log(resp[0].dataValues.description)
                // console.log(resp[0].dataValues.genres[0].dataValues.name)
                if (resp.length>0){
                    resp.forEach((game,i) => {
                        // console.log(i)
                        // console.log(game.dataValues.name)
                        // console.log(game.dataValues.rating)
                        // console.log(game.dataValues.description)
                        // console.log(game.dataValues.genres[0].dataValues.name)
                        accumulator.push({
                            name: game.dataValues.name,
                            rating: game.dataValues.rating,
                            genres:[game.dataValues.genres[0].dataValues.name]
                        })
                //     });
                })}
          


                return accumulator
            }

            res.json(await a())



        })()
    }
}
)




module.exports = router;


// https://api.rawg.io/api/games/valorant?key=22e3650b468248879394751f50361f50