import React, { Component } from 'react';
import Questions from '../Questions/Questions';
import QuestionCount from '../QuestionCount/QuestionCount';
import AnswerOption from '../AnswerOption/AnswerOption';
import { render } from '@testing-library/react';

class Quiz extends React.Component {
    renderAnswerOptions = (key) => {
        return (
            <AnswerOption
                key={key.content}
                answerContent={key.content}
                answerType={key.type}
                answer={this.props.answer}
                questionId={this.props.questionId}
                onAnswerSelected={this.props.onAnswerSelected}

            />
        );
    }
    componentDidMount = async () => {
        console.log('hitting')
        console.log(this.props.question)
        console.log(this.props.answerOptions)

    }
    render() {
        return (
            <div>
                {/* <div className='quiz'> */}
                <QuestionCount
                    counter={this.props.counter}
                    total={this.props.questionTotal}
                />
                <Questions content={this.props.question} />
                <ul className="answerOptions">
                    {this.props.answerOptions.map(this.renderAnswerOptions)}
                </ul>
            </div >
        );
    }

}


export default Quiz;