import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import './Header.css'
const Header = () => {
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
                    <li>
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
