import React from 'react';

function allResults(props) {
    console.log(props.results, 'here is all results page')
    return (
        <div className='allresults'>
            <h1>  Other  Users Characters </h1>
            <div>
                <br>
                </br>
                <button type="button" class="btn btn-info" onClick={() => props.handleFetchAllResults()}>Show All Results</button>
                {console.log(props.handleFetchAllResults)}
                <div>{props.allResults.map((result, idx) => {
                    return (
                        <div>
                            <div className='result' key={idx}>
                                <strong>Name: {result.users}</strong>
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
        </div>
    )

}

export default allResults;
