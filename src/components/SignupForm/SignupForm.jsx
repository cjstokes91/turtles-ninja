import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import userService from '../../utils/userService'
class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await userService.signup(this.state)
            this.props.handleSignupOrLogin();
            this.setState({
                name: '',
                email: '',
                password: '',
            })
            this.props.history.push('/quiz');
        }
        catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <form className='form-group' onSubmit={this.handleSubmit}>
                Sign Up
                <input className='form-group' value={this.state.name} type='text' name='name' placeholder='name' onChange={this.handleChange} />
                <input className='form-group' value={this.state.email} type='email' name='email' placeholder='email' onChange={this.handleChange} />
                <input className='form-group' value={this.state.password} type='password' name='password' placeholder='password' onChange={this.handleChange} />
                <input type='submit'></input>
                <Link to='/'>Cancel</Link>
            </form>
        )
    }
}
export default withRouter(SignupForm);