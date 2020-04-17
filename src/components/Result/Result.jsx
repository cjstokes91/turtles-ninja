import React from 'react';

function Result(props) {
    console.log('hitting result page')
    const resultsMapped = props.quizResult.map((e, idx) => {
        return (
            <div>
                <div className='result' key={idx}>
                    <div>
                        COWABUNGA!!!! you are most like
            </div>
                    <strong>Name: {e.name}</strong>
                    <div>
                        <strong>
                            Age: {e.age}
                        </strong>
                    </div>
                    <div>
                        <strong>
                            Favorite Weapon: {e.weapon}
                        </strong>
                    </div>
                    <div>
                        <strong>
                            Personality Type: {e.personality}
                        </strong>
                    </div>
                    <div>
                        <img src={e.img} />
                    </div>
                    <button className='button' handleDeleteResult={props.handleDeleteResult}>Delete Character</button>
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