import '../styles/styles.scss'
import { useHistory } from "react-router-dom";
import React from "react";


export default function Game({ game }) {
    let history = useHistory();
    const myStyle = {
        // backgroundColor:'green',
        backgroundImage: "url(" + game.imgUrl + ")",
        backgroundSize: '500px 400px',
    }

    const handleRedirect = (event) => {
        
        event.preventDefault()
        // console.log(game.name.spl)
        history.push('/game/'+game.name)

    }

    return (

        <div className='game' style={myStyle}>
            {game !== 1 && (
   
                <div onClick={handleRedirect} className='contentDiv'>
                    {/* <div style={myStyle}></div> */}
                    <h2 className='gameName'>{game.name}</h2>
                    <p>Rating: {game.rating}</p>
                    <p> Genres:</p>
                    <div className='gamesContent'>
                    {game.genres.map(genre => (
                        <p className='gamesP' key={game+ genre}>&nbsp;&nbsp;&nbsp;{genre}</p>
                    ))}
                    </div>
                </div>

            )
            }

        </div>
    )
}