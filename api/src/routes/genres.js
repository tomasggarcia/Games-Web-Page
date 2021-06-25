const { Router } = require('express')
const fetch = require("node-fetch");
require('dotenv').config();
const key = process.env.API_KEY
const { Genre } = require('../db')
const router = Router()




router.get('/', async function (req, res, next) {
    let genresList = []
        if(genresList.length<2){
            const response = await fetch(`https://api.rawg.io/api/genres?key=${key}`).then(res => res.json())
            // res.json(ans.results)
            for (i in response.results) {
                var [instanse, created] = await Genre.findOrCreate({
                    where: { name: response.results[i].name }
                }
                )
                genresList.push(instanse.dataValues.name)
            }
        }
        let resp = await Genre.findAll({
            attributes:['name']
        })
        
        res.json(resp.map(name=>name.name))
    }
)

module.exports = router;