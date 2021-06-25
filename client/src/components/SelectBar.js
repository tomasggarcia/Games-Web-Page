import '../styles/styles.scss'
import { setGenres, setOrder,setGenre} from '../Redux/actions/index.js'
import { useSelector, useDispatch } from 'react-redux'

export default function SelectBar() {
    const orderOptions = ['', 'A - Z ↓', 'Z - A ↑', 'Rating ↑', 'Rating ↓']
    const dispatch = useDispatch();

    const genres = useSelector(state=> state.genres)

    const genreHandler = function (event) {
        // console.log(event.target.value)
        // dispatch(setGenre(event.target.value))
        // console.log(event.target.value)
        dispatch(setGenre(event.target.value))
    }

    const orderHandler = function (event) {
        // dispatch(setOrder(event.target.value))
        dispatch(setOrder(event.target.value))
    }
    // if(genres!==undefined){
        return (
            <div className='divSelectBar'>

               <select className='content-select' id='genresSelect' onChange={genreHandler}>
                    <option value="">All</option>
                    {genres.map((genre, i) => (
                        <option key={i}>{genre}</option>

                    ))}
                </select>

                <select className='content-select' name="orderBy" onChange={orderHandler}>
                    {orderOptions.map((option, i) => (
                        <option value={option} key={i}>{option}</option>
                    ))}
                </select>
                <br></br>

                <br></br>
            </div>
        )
}