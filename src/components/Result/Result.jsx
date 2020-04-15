import React from 'react';

function Result(props) {
    return (
        <div className='result'>
            <div>
                COWABUNGA!!!! you are most like
            </div>
            <strong>Name: {props.quizResult.name}</strong>
            <div>
                <strong>
                    Age: {props.quizResult.age}
                </strong>
            </div>
            <div>
                <strong>
                    Favorite Weapon: {props.quizResult.weapon}
                </strong>
            </div>
            <div>
                <strong>
                    Personality Type: {props.quizResult.personality}
                </strong>
            </div>
            <div>
                <img src={props.quizResult.img} />
            </div>

        </div>
    )

}

export default Result; 