import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import userService from '../../utils/userService';

class LoginPage extends Component {

  state = {
    email: '',
    pw: ''
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      this.setState({
        email: '',
        pw: ''
      })

      // Successfully signed up - show GamePage
      this.props.history.push('/quiz');
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      alert('Invalid Credentials!');
      console.log(err)
    }
  }
  render() {
    return (
      <div className="LoginPage">
        <header className="header-footer">Log In</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default" to='/' >Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginPage);