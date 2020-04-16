import tokenService from './tokenService'

const BASE_URL = '/api/results';

const newResults = (results) => {
    console.log('this is the result service page')
    console.log(results)
    return (
        fetch(BASE_URL + '/newResults', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                // Add this header - don't forget the space after Bearer
                'Authorization': 'Bearer ' + tokenService.getToken()
            },
            body: JSON.stringify(results)
        })
            .then(res => {
                if (res.ok) return res.json()
                throw new Error('bad call')
            })
            .then(data => console.log(data))
    )
}
const getResults = (user) => {
    return (
        fetch(BASE_URL + '/getresult', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                // Add this header - don't forget the space after Bearer
                'Authorization': 'Bearer ' + tokenService.getToken()
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (res.ok) return res.json()
                throw new Error('bad call')
            })
            .then(data => {
                console.log(data)
                return data.result[0]
            })
    )
}
export default {
    newResults,
    getResults
}
