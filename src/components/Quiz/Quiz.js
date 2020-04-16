import React from 'react';
import Questions from '../Questions/Questions';
import QuestionCount from '../QuestionCount/QuestionCount';
import AnswerOption from '../AnswerOption/AnswerOption';

function Quiz(props) {
    function renderAnswerOptions(key) {
        return (
            <AnswerOption
                key={key.content}
                answerContent={key.content}
                answerType={key.type}
                answer={props.answer}
                questionId={props.questionId}
                onAnswerSelected={props.onAnswerSelected}

            />
        );
    }
    console.log(props.counter)
    return (
        // <div className={props.result ? 'hidden' : 'quiz'}>
        <div className='quiz'>
            <QuestionCount
                counter={props.counter}
                total={props.questionTotal}
            />
            <Questions content={props.question} />
            <ul className="answerOptions">
                {props.answerOptions.map(renderAnswerOptions)}
            </ul>
        </div >
    );
}


export default Quiz;