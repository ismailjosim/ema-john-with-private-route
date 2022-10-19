import React, { useContext, useState } from 'react';
import './UserCommon.css';
import google from '../../images/google.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';


const UserSignup = () => {
    const { createUser } = useContext(AuthContext);
    const [error, setError] = useState(null);



    const handleForm = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPass.value;


        if (password.length < 6) {
            setError('Password Should Be 6 characters or more');
            return;
        }
        if (password !== confirmPassword) {
            setError('Password did not match!');
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
            })
            .catch(error => {
                console.error("Error Found", error);
            })
    }

    return (
        <form onSubmit={handleForm} className='user-info-container'>
            <h3 className='form-title'>Sign Up</h3>
            <div className="input-field">
                <input type="email" name='email' placeholder='Your Email' required />
                <input type="password" name='password' placeholder='Password' required />

                <input type="password" name='confirmPass' placeholder='Confirm Password' required />
                <button>Sign Up</button>
            </div>
            <p className='error-message'>{error}</p>
            <div className='form-link'>
                <span>Already have an account?</span> <Link to="/login">Login</Link>
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

export default UserSignup;
