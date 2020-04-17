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
                // console.log(data)
                console.log(data.result)
                return data.result
            })
    )
}

const deleteOne = (id) => {
    const options = {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + tokenService.getToken() }
    };
    return fetch(`${BASE_URL}/${id}`, options).then(res => res.json());
}

// const deleteOne = (id) => {
//     return (
//         fetch(BASE_URL + '/myresults', {
//             method: 'DELETE',
//             headers: {
//                 // 'Content-type': 'application/json',
//                 // Add this header - don't forget the space after Bearer
//                 'Authorization': 'Bearer ' + tokenService.getToken()
//             },
//             body: JSON.stringify(id)
//         })
//             .then(res => {
//                 if (res.ok) return res.json()
//                 throw new Error('bad call')
//             })
//             .then(res => {
//                 // console.log(data)
//                 console.log(res.result)
//                 return res.id
//             })
//     )
// }




export default {
    newResults,
    getResults,
    deleteOne
}
