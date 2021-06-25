import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/styles.scss'
import Loading from './Loading'
import { useHistory } from "react-router-dom";


import { setFlag } from '../Redux/actions/index.js'
import { useDispatch } from 'react-redux'


export default function GameDetails() {
    let history = useHistory();
    var [GameDetails, setGameDetails] = useState([])
    var [render, setRender] = useState(false)
    const location = useLocation();
    const dispatch = useDispatch()

    const myStyle = {
        // backgroundColor:'green',
        backgroundImage: "url(" + GameDetails.image + ")",
    }


    useEffect(() => {

        (async function getGame() {
            GameDetails = await fetch(`http://localhost:3001/videogame/${location.pathname.slice(6)}`)
                .then(response => response.json())
            setGameDetails(GameDetails)
            if (GameDetails) {
                setRender(true)
            }
        }
        )()
        // }
        // el segundo argumento del use effect es para que actualice solo cuando cambie algun valor del array pasado
    }, [location.pathname])

    const handleDelete = async (event) => {
        event.preventDefault()
        await fetch(`http://localhost:3001/videogame/delete/${GameDetails.name}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: ''
        })
        history.push('/home')
        dispatch(setFlag(1))


    }
    if (render) {
        return (
            <div >
                    <div className='details' style={myStyle}>
                        <div className='detailsContent'>
                            <h1>{GameDetails.name}</h1>
                            <p>Description: {GameDetails.description}</p>
                            <p>Resleased: {GameDetails.released}</p>
                            <p>Rating: {GameDetails.rating}</p>
                            <div className='platformsD'> Platforms:
                                {GameDetails.platforms.map(platform =>

                                    <p>{platform}</p>

                                )}
                            </div>
                            <button onClick={handleDelete}>X</button>
                        </div>

                    </div>
            </div>
        )
    } else {
        return <Loading></Loading>
    }


}