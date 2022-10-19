import React from 'react';
import './UserCommon.css';
import google from '../../images/google.png';
import { Link } from 'react-router-dom';
const UserLogin = () => {

    const handleForm = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
    }


    return (
        <form onSubmit={handleForm} className='user-info-container'>
            <h3 className='form-title'>Log In</h3>
            <div className="input-field">
                <input type="email" name='email' placeholder='Your Email' required />
                <input type="password" name='password' placeholder='Password' required />
                <button>Login</button>
            </div>
            <div className='form-link'>
                <span>New to Ema-john?</span> <Link to="/signup">Create New Account</Link>
            </div>
            <div className='divider-line'>
                <hr />Or<hr />
            </div>
            <div>
                <button className='social-login-btn'>
                    <img src={google} alt="logo" />
                    <span>Continue with Google</span>
                </button>
            </div>

        </form>
    );
};

export default UserLogin;
