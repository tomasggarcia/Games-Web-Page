
export function addGame(game) {
    return {
        type: 'GAME',
        payload: game
    }
}

export function updResultOrder(result) {
    return {
        type: 'RESULT_ORDER',
        payload: result
    }
}

export function setOrder(result) {
    return {
        type: 'ORDER',
        payload: result
    }
}


export function setGenres(result) {
    return {
        type: 'GENRES',
        payload: result
    }
}

export function setGenre(result) {
    return {
        type: 'GENRE',
        payload: result
    }
}

export function setPage(result) {
    return {
        type: 'PAGE',
        payload: result
    }
}


export function setResponse(result) {
    return {
        type: 'RESPONSE',
        payload: result
    }
}

export function setPageResult(result) {
    return {
        type: 'PAGE_RESULT',
        payload: result
    }
}

export function setOrderResult(result) {
    return {
        type: 'ORDER_RESULT',
        payload: result
    }
}


export function setFlag(result) {
    return {
        type: 'FLAG',
        payload: result
    }
}

export function setGenreResult(result) {
    return {
        type: 'GENRE_RESULT',
        payload: result
    }
}
