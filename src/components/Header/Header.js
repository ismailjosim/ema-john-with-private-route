import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css'
const Header = () => {

    const { user, userSignOut } = useContext(AuthContext);



    return (
        <div className='container'>
            <nav className='navbar'>
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <ul className="navigation">
                    <li>
                        <Link to="/shop" className="nav-link">Shop</Link>
                    </li>
                    <li>
                        <Link to="/orders" className="nav-link">Order Review</Link>
                    </li>
                    <li>
                        <Link to="/inventory" className="nav-link">Manage Inventory</Link>
                    </li>
                    {user?.uid ?
                        <li className='list-item'>
                            <h3>{user.email}</h3>
                            <button onClick={userSignOut} className="nav-btn">Logout</button>

                        </li>
                        : <li><Link to="/login" className="nav-link nav-btn">Login</Link></li>

                    }
                </ul>
            </nav>
        </div >
    );
};

export default Header;
