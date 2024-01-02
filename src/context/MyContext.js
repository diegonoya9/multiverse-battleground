import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [userContext, setUserContext] = useState({
        idUsuario: 1,
        userName: "",
        backEndUrl: process.env.NODE_ENV === 'development' ? "http://localhost:3009/api" : "https://multiverse-battlegorund-back.onrender.com/api" // Otros datos relacionados con el usuario si es necesario
    });

    const setUserId = (newId) => {
        setUserContext({
            ...userContext,
            idUsuario: newId,
        });
    };
    const setUserName = (userName) => {
        setUserContext({
            ...userContext,
            userName
        });
    };

    return (
        <MyContext.Provider value={{ userContext, setUserId, setUserName }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyContextProvider };
