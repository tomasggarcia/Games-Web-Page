

export function sortResult (resultado,order){
    // console.log(resultado,order)

    function compareAsc(a, b) {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
    }
    function compareDesc(a, b) {
        if (a.name > b.name) {
            return -1
        }
        if (a.name < b.name) {
            return 1
        }
        return 0
    }
    function compareRatA(a, b) {
        if (a.rating < b.rating) {
            return -1
        }
        if (a.rating > b.rating) {
            return 1
        }
        return 0
    }
    function compareRatD(a, b) {
        if (a.rating > b.rating) {
            return -1
        }
        if (a.rating < b.rating) {
            return 1
        }
        return 0
    }
    if (order === '') {
        return(resultado)
    }
    if (order === 'A - Z ↓') {
        return(resultado.sort(compareAsc))
    }
    if (order === 'Z - A ↑') {

        return(resultado.sort(compareDesc))
    }
    if (order === 'Rating ↑') {

        return(resultado.sort(compareRatA))
    }
    if (order === 'Rating ↓') {
        return(resultado.sort(compareRatD))
    }
}

