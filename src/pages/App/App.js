import React from 'react';
import './App.css';
import SignupForm from '../../components/SignupForm/SignupForm';
import userService from '../../utils/userService';
import { Switch, Route } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import LoginPage from '../LoginPage/LoginPage';
import Questions from '../../components/Questions/Questions'
import QuizQuestions from '../../QuizQuestions/QuizQuestions';

class App extends React.Component {

  constructor(props) {
    super(props);
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
      </div>
    );
  }
}
export default App;