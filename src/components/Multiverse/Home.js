import { useState, useContext } from "react"
import { Outlet } from "react-router-dom"
import Multiverse from "./Multiverse"
import Modal from "../UI/Modal"
import Battleground from "../Fights/Battleground"
import classes from './Home.module.css'
import Button from "../UI/Button"
import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { MyContext } from '../../context/MyContext';
const Home = () => {
    const { t } = useTranslation();
    const { userContext, setUserId, setUserName } = useContext(MyContext);
    let backEndUrl = userContext.backEndUrl
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [showModal, setShowModal] = useState(true);
    const handleStartAdventure = () => {
        setShowModal(false);
    };
    const [activePage, setActivePage] = useState(1)
    const changeActivePage = (page) => {
        setActivePage(page)
    }
    const handleGoogleLogin = (credentials) => {
        const parameters = [{
            credentials: credentials
        }]
        fetch(backEndUrl + "/login", {
            method: 'POST', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        }).then(response => response.json())
            .then((data) => {
                if (data.user_id) {
                    setUserId(data.user_id)
                    setUserName(data.name)
                    setUserLoggedIn(true)
                }
            })
    }
    return (
        <GoogleOAuthProvider clientId="297991534299-1ed49hpjqhhudbcngaa0an7b0jts398v.apps.googleusercontent.com">
            {!userLoggedIn &&
                <div id="homeDivGoogle" className={classes.homeDivGoogle}><GoogleLogin
                    onSuccess={credentialResponse => {
                        handleGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    useOneTap
                /> </div>}
            {/*<div id="homeDiv" className={classes.homeDiv}>
                    {showModal && <Modal onClose={handleStartAdventure} color="white"  >
                        <h1 >{t('home.welcome')}</h1>
                        <p style={{ color: '#fff' }}>{t('home.getReady')}</p>
                        <Button colorType="green" value={t('home.start')} onClick={() => handleStartAdventure()}>
                        </Button></Modal>}
                    {activePage && activePage === 1 && !showModal && <Multiverse changeActivePage={changeActivePage}></Multiverse>}
                    {activePage && activePage === 2 && !showModal && <Battleground changeActivePage={changeActivePage}></Battleground>}
                </div> */}

            {userLoggedIn &&
                <div id="homeDiv" className={classes.homeDiv}>
                    <Outlet />
                </div>
            }
        </GoogleOAuthProvider>
    )
}

export default Home