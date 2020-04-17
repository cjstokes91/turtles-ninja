import React from 'react';
import resultService from '../../utils/resultService';



function Result(props) {
    const handleDeleteResult = async (id) => {
        console.log('this is handle delete')
        await resultService.deleteOne(id);

    }
    console.log('hitting result page')
    const resultsMapped = props.results.map((result, idx) => {
        return (
            <div>
                <div className='result' key={idx}>
                    <div>
                        COWABUNGA!!!! you are most like
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
                        <img src={result.img} />
                    </div>
                    <button className='button' onClick={() => handleDeleteResult(result._id)}>Delete Character</button>
                    <div>
                    </div>
                </div>
            </div>)
    })
    return (
        <div>{resultsMapped}</div>
    )

}


export default Result; 