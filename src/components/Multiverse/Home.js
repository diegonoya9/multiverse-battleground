import { useState, useContext, useEffect, useCallback } from "react"
import { Outlet } from "react-router-dom"
import classes from './Home.module.css'
import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { MyContext } from '../../context/MyContext';
import ReactAudioPlayer from 'react-audio-player';
const Home = () => {
    const { t } = useTranslation();
    const { userContext, setUser, setUserId, setUserName, setUserLoggedIn } = useContext(MyContext);
    let backEndUrl = userContext.backEndUrl
    let bg = userContext.bg
    let logged_in = userContext.logged_in
    const audioStyle = {
        display: 'none', // Oculta el reproductor de audio visualmente
    };
    const [song, setSong] = useState(0);
   

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
    const selectSong = useCallback(() => {
        const songs = [
            { id: 1, title: 'Song 1', src: '/assets/sounds/music/Aeroplane.WAV' },
            { id: 2, title: 'Song 2', src: '/assets/sounds/music/africa.mp3' },
            { id: 3, title: 'Song 3 ', src: '/assets/sounds/music/uptown.mp3' },
            { id: 4, title: 'Song 4', src: '/assets/sounds/music/feel.mp3' },
            { id: 5, title: 'Song 5', src: '/assets/sounds/music/what.mp3' },
            { id: 6, title: 'Song 6', src: '/assets/sounds/music/dust.mp3' }
            // Agrega más canciones según sea necesario
        ];
        let randomSong = Math.floor(Math.random() * songs.length)
        setSong(songs[randomSong].src)
    },[])
    useEffect(() => {
        const audio = document.getElementById('audioPlayer');
        if (audio) {
            audio.play()
        }
    }, [song])
    useEffect(() => {
        selectSong()
    }, [selectSong])
    return (
        <GoogleOAuthProvider clientId="297991534299-1ed49hpjqhhudbcngaa0an7b0jts398v.apps.googleusercontent.com">
            {song && <ReactAudioPlayer src={`${song}`} onEnded={() => selectSong()} volume={bg / 100} autoPlay id="audioPlayer" controls style={audioStyle} />}
            {!logged_in &&
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
            {logged_in &&
                <div id="homeDiv" className={classes.homeDiv}>
                    <Outlet />
                </div>
            }
        </GoogleOAuthProvider>
    )
}

export default Home