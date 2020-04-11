import React, { component } from 'react';
import userService from '../../utils/userService';
import { Component } from 'react';
class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    }
    render() {
        return (
            <form>
                <input type="text" name="name" placeholder="name" />
                <input type="text" name="email" placeholder="email" />
                <input type="text" name="password" placeholder="password" />
            </form>
        );
    }
}
export default SignupForm;