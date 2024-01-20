import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [userContext, setUserContext] = useState({
        user: {},
        logged_in: false,
        idUsuario: 1,
        userName: "",
        bg: 0,
        sfx: 0,
        sound: 0,
        backEndUrl: process.env.NODE_ENV === 'development' ? "http://localhost:3009/api" : "https://multiverse-battleground-back.onrender.com/api", // Otros datos relacionados con el usuario si es necesario
        backEndWS: process.env.NODE_ENV === 'development' ? "ws://localhost:3009" : "wss://multiverse-battleground-back.onrender.com", // Otros datos relacionados con el usuario si es necesario
        currentMission: 0,
        currentLevel: 0
    });
    const setUser = (user) => {
        setUserContext((prevValue) => {
            let newvalue = { ...prevValue }
            return {
                ...newvalue,
                user
            }
        });
    }
    const setUserId = (newId) => {
        setUserContext((prevValue) => {
            let newvalue = { ...prevValue }
            return {
                ...newvalue,
                idUsuario: newId
            }
        });
    }
    const setUserLoggedIn = (logged_in) => {
        setUserContext((prevValue) => {
            let newvalue = { ...prevValue }
            return {
                ...newvalue, logged_in
            }
        });
    }
    const setUserName = (userName) => {
        setUserContext((prevValue) => {
            let newvalue = { ...prevValue }
            return {
                ...newvalue,
                userName
            }
        });
    }
    const setCurrentMission = (mission) => {
        setUserContext((prevValue) => {
            let newvalue = { ...prevValue }
            return {
                ...newvalue,
                currentMission: mission
            }
        });
    }
    const setCurrentLevel = (level) => {
        setUserContext((prevValue) => {
            let newvalue = { ...prevValue }
            return {
                ...newvalue,
                currentLevel: level
            }
        });
    }
    const setBg = (bg) => {
        setUserContext((prevValue) => {
            let newvalue = { ...prevValue }
            return {
                ...newvalue,
                bg
            }
        });
    };
    const setSound = (sound) => {
        setUserContext((prevValue) => {
            let newvalue = { ...prevValue }
            return {
                ...newvalue,
                sound
            }
        });
    }
    const setSfx = (sfx) => {
        setUserContext((prevValue) => {
            let newvalue = { ...prevValue }
            return {
                ...newvalue,
                sfx
            }
        });
    }

    return (
        <MyContext.Provider value={{ userContext, setUser, setUserId, setUserName, setBg, setSound, setSfx, setCurrentLevel, setCurrentMission, setUserLoggedIn }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyContextProvider };
