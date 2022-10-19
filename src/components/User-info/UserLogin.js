import React, { useContext } from 'react';
import './UserCommon.css';
import google from '../../images/google.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';


const UserLogin = () => {
    const { UserLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';



    const handleForm = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        UserLogin(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error("Error Found", error)
            })
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
