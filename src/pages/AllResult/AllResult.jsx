import React from 'react';


function allResults(props) {
    console.log(props.results, 'here is all results page')
    return (
        <div>
            <button className='button' onClick={() => props.handleFetchAllResults()}>Show All Results</button>
            <div>{props.results.map((result, idx) => {
                return (
                    <div>
                        <div className='result' key={idx}>
                            <div>
                                Other  Users Characters
                </div>
                            <strong>Name: {result.user}</strong>
                            <div>
                            </div>
                            <strong>Name: {result.name}</strong>
                            <div>
                                <strong>
                                    Age: {result.age}
                                </strong>
                            </div>
                            <div>
                                <strong>
                                    Favorite Weapon: {result.weapon}
                                </strong>
                            </div>
                            <div>
                                <strong>
                                    Personality Type: {result.personality}
                                </strong>
                            </div>
                            <div>
                                <img alt={''} src={result.img} />
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>)
            })}</div>
        </div>
    )

}

export default allResults;
