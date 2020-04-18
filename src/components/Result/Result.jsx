import React from 'react';
import resultService from '../../utils/resultService';

function Result(props) {
    const handleDeleteResult = async (id) => {
        console.log('this is handle delete')
        await resultService.deleteOne(id);
        // possible if block to only show result if result == user
        props.handleFetchResults()
    }
    console.log('hitting result page', props.results)

    return (
        <div>{props.results.map((result, idx) => {
            return (
                <div>
                    <div className='result' key={idx}>
                        <div>
                            COWABUNGA!!!! you are most like
                </div>
                        <div>
                            <strong>USER:ID {result.user}</strong>
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
                        <button type="button" class="btn btn-danger" onClick={() => handleDeleteResult(result._id)}>Delete Character</button>
                        <div>
                        </div>
                    </div>
                </div>)
        })}</div>
    )

}


export default Result; 