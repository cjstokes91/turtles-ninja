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
import Home from '../Home/Home'

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  // }
  state = {
    user: userService.getUser(),
    counter: 0,
    questionId: 1,
    question: QuizQuestions[0].question,
    answerOptions: [],
    answer: '',
    answersCount: {},
    result: [],
  }
  componentDidUpdate() {
    console.log('component did update')
    console.log(this.state.answerOptions)
  }

  async componentDidMount() {
    const shuffledAnswerOptions = QuizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    if (this.state.user) {
      const results = await resultService.getResults(this.state.user)
      this.setState({
        question: QuizQuestions[0].question,
        answerOptions: shuffledAnswerOptions[0],
        result: results
      });
    }
    this.setState({
      question: QuizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

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
      result: '',
    });
  }

  handleSignupOrLogin = async () => {
    this.setState({ user: userService.getUser() })
    const result = await resultService.getResults(this.state.user)
    const shuffledAnswerOptions = QuizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    if (this.state.user) {
      const results = await resultService.getResults(this.state.user)
      this.setState({
        question: QuizQuestions[0].question,
        answerOptions: shuffledAnswerOptions[0],
        result: results
      });
    }
    this.setState({
      question: QuizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
    this.setState({
      result
    })
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

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  async setResults(result) {
    const newResult = turtleCharacters.filter(character => character.name === result[0])
    if (result.length === 1) {
      await resultService.newResults(newResult[0])
      // might have to check this out
      this.setState({ result: newResult[0] })
    } else {
      this.setState({ result: 'Not sure, probably a basic foot clan soldier' })
    }
  }
  showCharacter = () => {
    this.props.history.push('/character')
  }

  handleDeleteResult = async (id) => {
    console.log('this is handle delete')
    await resultService.deleteOne(id);
    this.setState(state => ({
      results: state.results.filter(r => r._id !== id)
    }), () => this.props.history.push('/'));
  }

  // async componentDidMount() { 
  //   const results = await quizResult.getAll();
  //   this.setState({results})
  // }


  render() {
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
          <Route exact path='/home' render={() => (
            <Home />
          )} />
          <Route exact path='/myresults' render={() => (
            <Result
              quizResult={this.state.result}
              handleDeleteResult={this.handleDeleteResult}
            />
          )} />
          <Route path='/quiz' render={() =>
            // if (this.state.user) {
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
            // }
            // else {
            //   return <Home />
            // }

            // ({ history }) => (
            //   <Quiz
            //     answer={this.state.answer}
            //     answerOptions={this.state.answerOptions}
            //     questionId={this.state.questionId}
            //     question={this.state.question}
            //     questionTotal={QuizQuestions.length}
            //     onAnswerSelected={this.handleAnswerSelected}
            //     setNextQuestion={this.setNextQuestion}
            //     counter={this.state.counter}
            //   // history={history}
            //   />
            // )
          } />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App); 