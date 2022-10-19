import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import './PrivateRoutes.css'

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <h2 className='loading'>Loading.....</h2>
    }

    if (user && user.uid) {
        return children;

    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default PrivateRoutes;
