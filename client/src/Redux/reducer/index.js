const initialState = []
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GAME':
            let game = action.payload
            return {
                ...state,
                game
            }
        case 'RESULT_ORDER':
            let resultadoOrder = action.payload
            return {
                ...state,
                resultadoOrder
            }
        case 'ORDER':
            let order = action.payload
            return {
                ...state,
                order
            }
        case 'GENRES':
            let genres = action.payload
            return {
                ...state,
                genres
            }
        case 'GENRE':
            let genre = action.payload
            return {
                ...state,
                genre
            }
        case 'PAGE':
            let page = action.payload
            return {
                ...state,
                page
            }
        case 'RESPONSE':
            let response = action.payload
            return {
                ...state,
                response
            }
        case 'PAGE_RESULT':
            let pageResult = action.payload
            return {
                ...state,
                pageResult
            }
        case 'ORDER_RESULT':
            let orderResult = action.payload
            return {
                ...state,
                orderResult
            }
        case 'FLAG':
            let flag = action.payload
            return {
                ...state,
                flag
            }
        case 'GENRE_RESULT':
            let genreResult = action.payload
            return {
                ...state,
                genreResult
            }
        default:
            return state
    }

}
export default reducer;
