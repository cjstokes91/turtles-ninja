import React from 'react';
import PropTypes from 'prop-types';

function Result(props) {
    return (
        <div className='result'>
            COWABUNGA!!!! you are most like <strong>{props.quizResult.name}</strong>
        </div>
    )

}

Result.propTypes = {
    quizResult: PropTypes.string.isRequired,

}

export default Result; 