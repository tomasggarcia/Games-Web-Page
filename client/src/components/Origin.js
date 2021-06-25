import React, { useEffect } from 'react'
import Game from './Game'
import Loading from './Loading'
import '../styles/styles.scss'

import { useSelector, useDispatch } from 'react-redux'
import { setGenres, setPage, setResponse, setPageResult, setOrderResult, setFlag, setGenreResult } from '../Redux/actions/index.js'
import { sortResult } from '../functions/sort'
import SelectBar from './SelectBar'


const { v4: uuidv4 } = require('uuid')

export default function Origin() {
    const dispatch = useDispatch();
    const order = useSelector(state => state.order);
    const genre = useSelector(state => state.genre);
    const page = useSelector(state => state.page);
    const response = useSelector(state => state.response);
    const orderResult = useSelector(state => state.orderResult);
    const pageResult = useSelector(state => state.pageResult);
    const flag = useSelector(state => state.flag);
    const genreResult = useSelector(state => state.genreResult);
    let pageMax = 5;


    useEffect(() => {
        (async function() {
            if (flag === 1) {
                console.log('Flagg' + flag)
                let resp = await fetch(`http://localhost:3001/videogames?`).then(response => response.json())
                // console.log(resp)
                console.log('response')
                dispatch(setResponse(resp));
                dispatch(setPage(1));
                dispatch(setFlag(0))
            }
        })()
    }, [flag])



    useEffect(() => {
        (async function () {
            // if (!genres) {
            let resp = await fetch('http://localhost:3001/genres')
                .then(response => response.json())

            dispatch(setGenres(resp))
            // console.log(genres)

            // }
        })()
    }, [flag])


    const nextHandler = (event) => {
        console.log(pageMax)
        console.log(page)
        if (page <= pageMax) {
            dispatch(setPage(page + 1))
        }
    }
    const prevHandler = (event) => {
        if (page > 1) {
            dispatch(setPage(page - 1))
        }
    }

    useEffect(() => {
        if (genre === '') {
            dispatch(setGenreResult((response)))
        } else {
            dispatch(setGenreResult((response.filter((game) => game.genres.includes(genre)))))
        }
        // console.log(genreResult)
    }, [response, genre])

    useEffect(() => {
        sortResult(genreResult, order)
        // console.log(filtered)
        if (genreResult) {
            dispatch(setOrderResult(genreResult))
            console.log('dispacho el order')
        }
    }, [genreResult, order])


    useEffect(() => {
        console.log('entro al use effect')
        let pageSize = 9
        let initialIndex = page * pageSize - pageSize
        let finalIndex = page * pageSize
        if (orderResult) {
            console.log('entro al use effect')
            let presult = orderResult.slice(initialIndex, finalIndex)
            pageMax = Math.ceil(orderResult.length / 9)
            dispatch(setPageResult(presult))
        }
    }, [orderResult, order, page])


    useEffect(() => {
        dispatch(setPage(1))
    }, [genre, order])

    
    console.log(pageResult)
    if (flag===1) {
        return <Loading></Loading>
    } else {

        return (
            <div style={{ backgroundColor: 'black' }}>
                {/* <p>{'game' + game.name}</p> */}
                {/* <button onClick={() => dispatch(addGame({name:'nuevo'}))}>x</button><br></br> */}
                <div className='prueba1'>
                    <div className="arrow" onClick={nextHandler}>
                        <div className="arrow-top"></div>
                        <div className="arrow-bottom"></div>
                    </div>

                </div>

                <div className='prueba2'>
                    <div className="arrow" onClick={prevHandler} >
                        <div className="arrow-top"></div>
                        <div className="arrow-bottom"></div>
                    </div>

                </div>

                <div className='prueba'>
                    {pageResult !== undefined ?
                        (
                            pageResult.map(game =>
                                <Game game={game} key={uuidv4()}></Game>
                            ))
                        :
                        null
                    }
                </div>
                {pageResult[0]?null:
                    <div className='originDivDown'> </div>
                }

            </div>
        )
    }

}



