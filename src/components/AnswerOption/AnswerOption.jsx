import React from 'react';



function AnswerOption(props) {
    return (
        <ul>
            <li className="answerOption">
                <input
                    type="radio"
                    className="radioCustomButton"
                    name="radioGroup"
                    checked={props.answerType === props.answer}
                    id={props.answerType}
                    value={props.answerType}
                    disabled={props.answer}
                    onChange={props.onAnswerSelected}
                />
                <label className="radioCustomLabel" htmlFor={props.answerType}>
                    {props.answerContent}
                </label>
            </li>
        </ul>
    )
}


export default AnswerOption; 
