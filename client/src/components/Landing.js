import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/styles.scss'
// import background from '../img/dcit0cn-157a4e19-17b7-434d-9fce-b359aef92965.jpg'




// style={{ backgroundImage: `url(${background})` }}
export default function Landing() {
    return (

        <div className='landing'>

            {/* <body>
            <p>Landing</p>
                    </body> */}
            <body>
                <button className='buttonLanding'> 
                    <NavLink exact to="/home" >Enter</NavLink>
                </button>

            </body>


        </div>


              )    
    }