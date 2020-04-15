import React from 'react';




function newResults(props) {
    return (
        <h1>
            Quiz Results:
            {props.quizResult.name}
            {/* key={quizResult._id} */}
            {/* character={props.quizResult.name} */}
        </h1>
    )
}

export default newResults;