import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [userContext, setUserContext] = useState({
        idUsuario: 1,
        userName: "",
        bg:0,
        sfx:0,
        sound:0,
        backEndUrl: process.env.NODE_ENV === 'development' ? "http://localhost:3009/api" : "https://multiverse-battlegorund-back.onrender.com/api" // Otros datos relacionados con el usuario si es necesario
    });

    const setUserId = (newId) => {
        setUserContext((prevValue) => {
            let newvalue={...prevValue}
            return{
            ...newvalue,
            idUsuario:newId
        }
    });}
    const setUserName = (userName) => {
        setUserContext((prevValue) => {
            let newvalue={...prevValue}
            return{
            ...newvalue,
            userName
        }
    });}
    const setBg = (bg) => {
        setUserContext((prevValue) => {
            let newvalue={...prevValue}
            return{
            ...newvalue,
            bg
        }
    });
    };
    const setSound = (sound) => {
        setUserContext((prevValue) => {
            let newvalue={...prevValue}
            return{
            ...newvalue,
            sound
        }
    });}
    const setSfx = (sfx) => {
        setUserContext((prevValue) => {
            let newvalue={...prevValue}
            return{
            ...newvalue,
            sfx
        }
    });}

    return (
        <MyContext.Provider value={{ userContext, setUserId, setUserName,setBg,setSound,setSfx }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyContextProvider };
