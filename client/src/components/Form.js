import { useEffect, useState } from 'react'
import moment from 'moment';
import '../styles/styles.scss'
import { setFlag } from '../Redux/actions/index.js'
import { useDispatch} from 'react-redux';
let now = new Date();
var dateString = moment(now).format('YYYY-MM-DD');


export default function Form() {

    // reemplazar con el estado global genres, cuando tenga el store
    const dispatch = useDispatch()
    var [genres, setGenres] = useState([])
    var [sName, setName] = useState('')
    var [sDescription, setDescription] = useState('')
    var [sPlatforms, setPlatforms] = useState('')
    var [sRating, setRating] = useState([])
    var [sReleased, setReleased] = useState([])
    var [sGenre, setGenre] = useState('')

    var [state, setState] = useState('')

    var [newGenre, setNewGenre] = useState('')
    var [newGenres, setNewGenres] = useState([])


    if (state === 'Successfully created') {
        dispatch(setFlag(1))
    }


    useEffect(() => {
        // funcion auto invocada porque a react no le gusta que haga 
        // el callback async
        (async function () {
            if (genres.length < 2) {
                genres = await fetch('http://localhost:3001/genres')
                    .then(response => response.json())
                setGenres(genres)
            }

        })()
    }, [genres])


    const handleChange = (event) => {
        let eName = event.target.name
        let eValue = event.target.value
        switch (eName) {
            case 'name':
                if (eValue.length > 0) {
                    setName(eValue[0].toUpperCase() + eValue.slice(1))
                    console.log(eValue[0].toUpperCase() + eValue.slice(1))
                }

                break
            case 'description':
                setDescription(eValue)
                break
            case 'released':
                setReleased(eValue)
                break
            case 'platforms':
                setPlatforms(eValue)
                break
            case 'rating':
                setRating(eValue)
                break
            case 'genre':
                setGenre(eValue)
                break
            case 'new':
                setNewGenre(eValue)
                break
            default:
                break
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let genresToAdd = [sGenre, ...newGenres]
        genresToAdd = genresToAdd.filter(genre => genre !== '')
        console.log(genresToAdd.length)
        console.log(genresToAdd)
        if (sName === '') {
            alert('Name must be filled out')
        } else if (sDescription === '') {
            alert('Description must be filled out')
        } else if (sPlatforms === '') {
            alert('Platforms must be filled out')
        } else if (genresToAdd[0] === '' && !genresToAdd[1]) {
            alert('Must have at least 1 genre')
        } else {
            let data = {
                name: sName,
                description: sDescription,
                platforms: sPlatforms,
                rating: sRating,
                released: sReleased,

                genre: genresToAdd
                // genre: sGenre
            }

            if (event.target.name === 'send') {
                fetch('http://localhost:3001/videogame', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }).then(response => response.json()).then(resp => { setState(resp) })
            }
        }
    }
    
    const handleAdd = (event) => {
        event.preventDefault()
        setNewGenres([...newGenres, newGenre])
    }
    const handleGenre = (event) => {
        console.log(event.target.value[0])
        console.log(event.target.value[0]!==undefined)
        if(event.target.value[0]!==undefined){
            event.preventDefault()
            setNewGenres([...newGenres, sGenre])
        }

    }

    const handleDelete = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setNewGenres(newGenres.filter(genre => genre !== event.target.value))
    }



    return (
        <div className='divForm'>
            <h1>NEW GAME</h1>
                        {<p className='pbox'>{state}</p>}
            <div className='input-container' ></div>
            <form className='principalForm'>
                <br></br>

                <label className='form_label'>Name</label><br></br>
                <input className='' name='name' onChange={handleChange}></input><br></br>
                <label>Description</label><br></br>
                <input name='description' onChange={handleChange}></input><br></br>
                <label>Release Date</label><br></br>
                <input name='released' onChange={handleChange} type='date' min='1958-01-01' max={dateString} ></input><br></br>
                <label>Rating</label><br></br>
                <input name='rating' onChange={handleChange}></input><br></br>
                <label>Platforms</label><br></br>
                <input name='platforms' onChange={handleChange}></input><br></br>
                <select id='genresSelect' name='genre' onChange={handleChange} onClick={handleGenre}>
                    <option></option>
                    {genres.map((genre, i) => (
                        <option value={genre} key={i}>{genre}</option>

                    ))}
                </select><br></br>
                {/* usar modal para agregar categories */}
                {/* <input type='submit' onClick={handleSubmit}>Add category</input> */}
                <input className='btn' type='submit' value='Send' name='send' onClick={handleSubmit}></input>
                <form className='form2'>
                <input  className='btn'  type='submit' name='add' value='New Genre' onClick={handleAdd} ></input>

                <input className='form-input-material'  name='new' onChange={handleChange}></input><br></br>
            </form>

            {newGenres.map((genre, i) =>
                <div className='formDiv'>
                    <p key={i}>{genre}</p>
                    <button key={i+ genre} value={genre} onClick={handleDelete}>x</button>
                </div>
                // console.log(newGenres)

            )}
            
            
            </form>


        </div>
    )
}