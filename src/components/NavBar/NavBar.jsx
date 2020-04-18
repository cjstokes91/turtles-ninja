import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = (props) => {
    function checking() {
        console.log('checking function')
    }
    let nav = props.user ?
        <div>
            <Link to='' onClick={props.handleLogout} className='NavBar-link'>LOG OUT</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <span className='NavBar-welcome'>WELCOME, {props.user.name}</span>
            <div>
                <Link to='myresults' onClick={props.handleResults} className='results'>My Results</Link>
            </div>
            <div>
                <Link to='allresults' onClick={props.handleAllResults} className='results'>All Results</Link>
            </div>
            <div>
                <Link to='/quiz' onClick={checking} className='quiz'>Take Quiz</Link>
            </div>
            <Link to='/home' className='character-page'>Home</Link>
        </div>
        :
        <div>
            <Link to='/login' className='NavBar-link'>LOG IN</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
        </div>;
    return (
        <div className='NavBar'>
            {nav}
        </div>
    );
};
export default NavBar;