import { useState, useContext } from "react"
import { Outlet } from "react-router-dom"
import classes from './Home.module.css'
import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { MyContext } from '../../context/MyContext';
const Home = () => {
    const { t } = useTranslation();
    const { userContext, setUser, setUserId, setUserName } = useContext(MyContext);
    let backEndUrl = userContext.backEndUrl
    const [userLoggedIn, setUserLoggedIn] = useState(false)
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
                    fetch(backEndUrl + "/allusers/" + data.user_id)
                        .then(response => response.json())
                        .then(responseData => {
                            setUser(responseData[0])
                            setUserId(data.user_id)
                            setUserName(data.name)
                            setUserLoggedIn(true)
                        })
                }
            })
    }
    return (
        <GoogleOAuthProvider clientId="297991534299-1ed49hpjqhhudbcngaa0an7b0jts398v.apps.googleusercontent.com">
            {!userLoggedIn &&
                <div id="homeDivGoogle" className={classes.homeDivGoogle}>
                    <div className={classes.divh1Login}>
                        <h1 className={classes.h1Login}>{t('home.login')}</h1>
                    </div>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            handleGoogleLogin(credentialResponse)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                    /> </div>}
            {userLoggedIn &&
                <div id="homeDiv" className={classes.homeDiv}>
                    <Outlet />
                </div>
            }
        </GoogleOAuthProvider>
    )
}

export default Home