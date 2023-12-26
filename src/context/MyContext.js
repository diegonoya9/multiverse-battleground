import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [userContext, setUserContext] = useState({
        idUsuario: 1,
        backEndUrl: "http://localhost:3009/api"
        // Otros datos relacionados con el usuario si es necesario
    });

    const setUserId = (newId) => {
        setUserContext({
            ...userContext,
            idUsuario: newId,
        });
    };

    return (
        <MyContext.Provider value={{ userContext, setUserId }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyContextProvider };
