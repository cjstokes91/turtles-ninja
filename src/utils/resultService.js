const BASE_URL = '/api/results';

const newResults = (results) => {
    return (
        fetch(BASE_URL + '/newResults', {
            method: 'POST',
            headers: new Headers(
                { 'Content-Type': 'application/json' }
            ),
            body: JSON.stringify(results)
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
