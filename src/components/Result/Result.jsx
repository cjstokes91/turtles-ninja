import React from 'react';

function Result(props) {
    return (
        <div className='result'>
            <div>
                COWABUNGA!!!! you are most like
            </div>
            <strong>{props.quizResult.name}</strong>
            <div>
                <strong>
                    {props.quizResult.age}
                </strong>
            </div>
            <div>
                <strong>
                    {props.quizResult.weapon}
                </strong>
            </div>
            <div>
                <strong>
                    {props.quizResult.personality}
                </strong>
            </div>
            <div>
                <img img={'https://imgur.com/FIrBgfd'} />
            </div>
    );
}
        </div>
    )

}

export default Result; 