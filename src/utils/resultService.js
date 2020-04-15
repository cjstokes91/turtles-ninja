import tokenService from './tokenService'

const BASE_URL = '/api/results';

const newResults = (results) => {
    console.log(results)
    return (
        fetch(BASE_URL + '/newResults', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                // Add this header - don't forget the space after Bearer
                'Authorization': 'Bearer ' + tokenService.getToken()
            },
        })
            .then(res => {
                if (res.ok) return res.json
                throw new Error('bad call')
            })
            .then(data => console.log(data))
    )
}

export default {
    newResults
}
