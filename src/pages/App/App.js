import React from 'react';
import './App.css';
import SignupForm from '../../components/SignupForm/SignupForm';
import userService from '../../utils/userService';
import { Switch, Route } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import LoginPage from '../LoginPage/LoginPage';
import Questions from '../../components/Questions/Questions'
import QuizQuestions from '../../QuizQuestions/QuizQuestions';
import Quiz from '../../components/Quiz/Quiz';
import Result from '../../components/Result/Result';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

  }
  state = {
    user: userService.getUser(),
    counter: 0,
    questionId: 1,
    question: '',
    answerOptions: [],
    answer: '',
    answersCount: {},
    result: ''

  }
  componentDidMount() {
    const shuffledAnswerOptions = QuizQuestions.map((question) => this.shuffleArray(question.answers));

    this.setState({
      question: QuizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() })
  }

  setUserAnswer(answer) {
    this.setState((state) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }))
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: QuizQuestions[counter].question,
      answerOptions: QuizQuestions[counter].answers,
      answer: ''
    })
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.QuestionId < QuizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  getResults() {
    const answerCount = this.state.answerCount;
    const answerCountKeys = Object.keys(answerCount);
    const answerCountValues = answerCountKeys.map((key) => answerCount[key])
    const maxAnswerCount = Math.max.apply(null, answerCountValues);

    return answerCountKeys.filter((key) => answerCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] })
    } else {
      this.setState({ result: 'Not sure who you are' })
    }
  }


  render() {
    return (
      <div className="App">
        <header>NINJA TURTLES</header>
        <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        <Questions content="what is your favorite food?" />
        <Route path='/signup' render={(props) => (
          <SignupForm {...props} />
        )
        } />
        <Route path='/login' render={(props) => (
          <LoginPage {...props} />
        )
        } />
        <Quiz
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={QuizQuestions.length}
          onAnswerSelected={this.handleAnswerSelected}
        />
        <Result quizResult={this.state.result} />
      </div>
    );
  }
}
export default App; 