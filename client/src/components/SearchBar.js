import { useState } from 'react'
import React from 'react'
import '../styles/styles.scss'
import { useHistory } from "react-router-dom";

export default function SearchBar() {
    let history = useHistory();
    var [search, setSearch] = useState('')


    const handleChange = (event) => {
        // ver si hace falta
        event.preventDefault()
        setSearch(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // return <Redirect to="/" />
        if (event.target.name === 'search') {
            history.push('/game/' + search)
        }
        if (event.target.name === 'addGame') {
            history.push('/create')
        }
        if (event.target.name === 'home') {
            history.push('/home')
        }


    }

    return (

        <div className='container'>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="topnav">
                <a className="active" href="#home" name='home' onClick={handleSubmit}>Home</a>
                <a name='addGame' onClick={handleSubmit}>Add Game</a>

                <div className="search-container">
                    <form>
                        <input type="text" placeholder="Search.." name="search" value={search} onChange={handleChange}></input>
                        <button type="submit" className="fa fa-search" name='search' onClick={handleSubmit}></button>
                    </form>
                </div>
            </div>

        </div>



    )
}