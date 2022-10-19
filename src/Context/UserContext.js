import React, { createContext } from 'react';



export const AuthContext = createContext();

const UserContext = ({ children }) => {


    const AuthInfo = {}
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;