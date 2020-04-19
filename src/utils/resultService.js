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
        // .then(data => console.log(data))
    )
}
/*
const getMyResults = (user) => {
    return (
        fetch(BASE_URL + '/getmyresults', {
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
                // console.log(data)
                console.log(data.result)
                return data.result
            })
    )
}
*/
const getMyResults = () => {
    console.log('hitting result service')
    return fetch(BASE_URL + '/getmyresults',
        {
            headers: {
                'Content-type': 'application/json',
                // Add this header - don't forget the space after Bearer
                'Authorization': 'Bearer ' + tokenService.getToken()
            }
        }
    )
        .then(res => res.json());
}


const getAllResults = () => {
    console.log('hitting result service')
    return fetch(BASE_URL)
        .then(res => res.json());
}

const deleteOne = (id) => {
    const options = {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + tokenService.getToken() }
    };
    return fetch(`${BASE_URL}/${id}`, options).then(res => res.json());
}



export default {
    newResults,
    getMyResults,
    deleteOne,
    getAllResults
}
