import React from 'react';
import './App.css';
import SignupForm from '../../components/SignupForm/SignupForm';
import userService from '../../utils/userService';
import { Switch, Route, withRouter } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import LoginPage from '../LoginPage/LoginPage';
import QuizQuestions from '../../QuizQuestions/QuizQuestions';
import Quiz from '../../components/Quiz/Quiz';
import turtleCharacters from '../../Const/characters';
import resultService from '../../utils/resultService';
import Home from '../Home/Home';
import AllResult from '../AllResults/AllResults';
import MyResults from '../../components/MyResults/MyResults';

class App extends React.Component {
  state = {
    user: userService.getUser(),
    counter: 0,
    questionId: 1,
    question: QuizQuestions[0].question,
    answerOptions: [],
    answer: '',
    answersCount: {},
    myResults: [],
    result: {},
    allResults: []
  }

  async componentDidMount() {
    const shuffledAnswerOptions = QuizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    if (this.state.user) {
      const myResults = await resultService.getMyResults(this.state.user)
      console.log(myResults, 'this is results')
      this.setState({
        question: QuizQuestions[0].question,
        answerOptions: shuffledAnswerOptions[0],
        myResults: myResults
      });
    }
  }
  x = this.state.myResults.length ?
    <div>{this.state.myResults.map((result, idx) => {
      return (
        <div>
          <div className='result' key={idx}>
            <div>
              COWABUNGA!!!! you are most like
                </div>
            <div>
              {/* <strong>USER:ID {result.use}</strong> */}
            </div>
            <strong>Name: {result.name}</strong>
            <div>
              <strong>
                Age: {result.age}
              </strong>
            </div>
            <div>
              <strong>
                Favorite Weapon: {result.weapon}
              </strong>
            </div>
            <div>
              <strong>
                Personality Type: {result.personality}
              </strong>
            </div>
            <div>
              <img alt={''} src={result.img} />
            </div>
            <button type="button" class="btn btn-danger" onClick={() => this.handleDeleteResult(result._id)}>Delete Character</button>
            <div>
            </div>
          </div>
        </div>)
    })}</div>
    : <div>
      Results Loading
        </div>

  shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  handleLogout = () => {
    userService.logout();
    this.setState({
      user: null, counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      myResults: [],
      result: {},
      allResults: []
    });
    this.props.history.push('/')
  }

  handleSignupOrLogin = async () => {
    this.setState({ user: userService.getUser() })
    const myResults = await resultService.getMyResults(this.state.user)
    console.log(myResults, 'this is my results')
    this.handleFetchAllResults()
    const shuffledAnswerOptions = QuizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    if (this.state.user) {
      this.setState({
        question: QuizQuestions[0].question,
        answerOptions: shuffledAnswerOptions[0],
        myResults: myResults
      });
    }
  }

  handleMyResults = async () => {
    const myResults = await resultService.getMyResults(this.state.user)
    console.log(myResults, 'handle fetch result')
    this.setState({ myResults: myResults })
  }

  handleFetchAllResults = async () => {
    const allResults = await resultService.getAllResults()
    console.log('hitting fetch all')
    this.setState({ allResults: allResults })
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

  handleAnswerSelected = (event) => {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < QuizQuestions.length) {
      this.setNextQuestion()
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  handleDeleteResult = async (id) => {

    console.log('this is handle delete')
    await resultService.deleteOne(id);
    this.handleMyResults()

  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  async setResults(result) {
    console.log(result)
    const newResult = turtleCharacters.filter(character => character.name === result[0])

    const newResultObj = await resultService.newResults(newResult[0])
    this.setState(state => ({
      myResults: [...state.myResults, newResultObj]
    }))
  }

  render() {
    return (
      <div className="App">
        <header className='header'>N I N J A <br></br>T U R T L E S</header>
        <NavBar user={this.state.user} handleLogout={this.handleLogout} handleFetchResults={this.handleFetchResults} />
        <Switch>
          <Route exact path='/signup' render={() => (
            <SignupForm handleSignupOrLogin={this.handleSignupOrLogin} />
          )
          } />
          <Route exact path='/login' render={() => (
            <LoginPage handleSignupOrLogin={this.handleSignupOrLogin} />
          )
          } />
          <Route exact path='/home' render={() => (
            <Home />
          )} />
          <Route exact path='/allresults' render={() => (
            <AllResult
              allResults={this.state.allResults}
              handleFetchAllResults={this.handleFetchAllResults}
            />
          )} />
          <Route exact path='/myresults' render={() => (
            <MyResults
              myResults={this.state.myResults}
              handleMyResults={this.handleMyResults}
              x={this.x}
              handleDeleteResult={this.handleDeleteResult}

            />
          )} />
          <Route path='/quiz' render={() =>
            (
              <Quiz
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                question={this.state.question}
                questionTotal={QuizQuestions.length}
                onAnswerSelected={this.handleAnswerSelected}
                setNextQuestion={this.setNextQuestion}
                counter={this.state.counter}
              />
            )
          } />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App); 