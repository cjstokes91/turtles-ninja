import React from 'react';
import './App.css';
import SignupForm from '../../components/SignupForm/SignupForm';
import userService from '../../utils/userService';
import { Switch, Route, withRouter } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import LoginPage from '../LoginPage/LoginPage';
import QuizQuestions from '../../QuizQuestions/QuizQuestions';
import Quiz from '../../components/Quiz/Quiz';
import Result from '../../components/Result/Result';
import turtleCharacters from '../../Const/characters'
import resultService from '../../utils/resultService'
import MyResults from '../MyResults/MyResults'

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
    result: '',


  }

  componentDidMount() {
    console.log(QuizQuestions)
    const shuffledAnswerOptions = QuizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
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
    console.log(this.state)
  }

  handleAnswerSelected = (event) => {
    console.log('hitting answer Selcected', this.state.questionId)
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < QuizQuestions.length) {
      // setTimeout(() => this.setNextQuestion(), 300);
      console.log('hitting if')
      this.setNextQuestion()
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  async setResults(result) {
    const newResult = turtleCharacters.filter(character => character.name === result[0])
    console.log(newResult[0])
    console.log('this is the New Result')
    if (result.length === 1) {
      await resultService.newResults(newResult[0])
      this.setState({ result: newResult[0] })

      // console.log(this.state.user)
    } else {
      this.setState({ result: 'Not sure, probably a basic foot clan soldier' })
    }
  }


  showCharacter = () => {
    this.props.history.push('/character')
  }

  showResults = () => {

  }

  render() {
    console.log(this.state.counter)
    return (
      <div className="App">
        <header>NINJA TURTLES</header>
        <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        <Switch>
          <Route exact path='/signup' render={() => (
            <SignupForm handleSignupOrLogin={this.handleSignupOrLogin} />
          )
          } />
          <Route exact path='/login' render={() => (
            <LoginPage handleSignupOrLogin={this.handleSignupOrLogin} />
          )
          } />
          <Route exact path='/myresults' render={() => (
            <MyResults result={this.state.result} />
          )} />
          <Route exact path='/quiz' render={() => (

            <Quiz
              answer={this.state.answer}
              answerOptions={this.state.answerOptions}
              questionId={this.state.questionId}
              question={this.state.question}
              questionTotal={QuizQuestions.length}
              onAnswerSelected={this.handleAnswerSelected}
              setNextQuestion={this.setNextQuestion}
              counter={this.state.counter}
              result={this.state.result}
            />
          )} />
        </Switch>
        {
          this.state.result ? <Result quizResult={this.state.result} /> : ''

        }
      </div>
    );
  }
}
export default withRouter(App); 