import { memo, useState, useEffect, useContext } from "react"
import FightersPage from "./FightersPage.js"
import ObjectsPage from "./ObjectsPage.js"
import UsersPage from './UsersPage.js'
import SettingsPage from './SettingsPage.js'
import MissionsPage from "./MissionsPage.js"
import MatchMaking from "./MatchMaking.js"
import classes from './Multiverse.module.css'
import ShopPage from "./ShopPage.js"
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/Aeroplane.WAV"
import Button from "../UI/Button.js"
import { MyContext } from '../../context/MyContext';
import { useTranslation } from 'react-i18next';
import Loading from "../UI/Loading.js"
const Multiverse = ({ changeActivePage }) => {
    const { t } = useTranslation();
    const audioStyle = {
        display: 'none', // Oculta el reproductor de audio visualmente
    };
    const [song, setSong] = useState(0);

    const songs = [
        { id: 1, title: 'Song 1', src: '/assets/sounds/music/Aeroplane.WAV' },
        { id: 3, title: 'Song 3', src: '/assets/sounds/music/africa.mp3' },
        { id: 18, title: 'Song 18', src: '/assets/sounds/music/uptown.mp3' },
        { id: 19, title: 'Song 19', src: '/assets/sounds/music/welcome.mp3' },
        { id: 20, title: 'Song 20', src: '/assets/sounds/music/what.mp3' }
        // Agrega más canciones según sea necesario
    ];

    const { userContext, setUserName, setSound, setBg, setSfx, setCurrentMission } = useContext(MyContext);
    let activeUser = userContext.idUsuario
    let backEndUrl = userContext.backEndUrl
    let bg = userContext.bg
    const [multiverseActivePage, setMultiverseActivePage] = useState("mainMenu")
    const changeMultiverseActivePage = (activePage) => {
        setMultiverseActivePage(activePage)
    }
    const [user, setUser] = useState()
    const [money, setMoney] = useState()
    useEffect(() => {
        if (user) {
            let newMoney = user.userobjects.filter((object) => {
                return object.objects.name === "Money"
            })
            setMoney(newMoney[0].quantity)
        }
    }, [user])
    const updateUser = () => {
        fetch(backEndUrl + '/allusers/' + activeUser)
            .then(response => response.json())
            .then(data => {
                setUser(data[0])
                setSound(data[0].sound_volume)
                setSfx(data[0].sfx_volume)
                setBg(data[0].bg_volume)
            })
    }
    const selectSong = () => {
        let randomSong = Math.floor(Math.random() * songs.length)
        setSong(songs[randomSong].src)
    }
    useEffect(() => {
        fetch(backEndUrl + '/allusers/' + activeUser)
            .then(response => response.json())
            .then(data => setUser(data[0]))
     
    }, [activeUser])

    useEffect(() => {
        const audio = document.getElementById('audioPlayer');
        if (audio) {
            audio.play()
        }
    }, [song])
    useEffect(() => {
        setCurrentMission(0)
        selectSong()
    }, [])
    useEffect(() => {
        fetch(backEndUrl + '/allusers/' + activeUser)
            .then(response => response.json())
            .then(data => {
                setUser(data[0])
                setUserName(data[0].name)
                setSound(data[0].sound_volume)
                setSfx(data[0].sfx_volume)
                setBg(data[0].bg_volume)
            })
    }, [multiverseActivePage, activeUser])
    return (
        <div alt='mainDiv' className={`${classes.container} ${multiverseActivePage === "mainMenu" && classes.notScrollable}`} >
            {multiverseActivePage === 'mainMenu' && user &&
                <div className={classes.mainMenu}>
                    {song && <ReactAudioPlayer src={`${song}`} onEnded={() => selectSong()} volume={bg / 100} autoPlay id="audioPlayer" controls style={audioStyle} />}
                    <div id="divWelcome" className={classes.divWelcome}>
                        <h1 className={classes.h1}>{t('multiverse.welcome')} {user.name}</h1>
                        <h2 className={classes.h2}>{t('multiverse.money')} {money} pesos</h2>
                    </div>
                    <div className={classes.btnContainer} >
                        <Button value={t('multiverse.fight')} colorType="red" onClick={() => changeActivePage(2)}></Button>
                        <Button value={t('multiverse.missions')} colorType="yellow" onClick={(e) => {
                            changeMultiverseActivePage('missions');
                        }}></Button>
                        <Button value={t('multiverse.pvp')} colorType="yellow" onClick={(e) => {
                            changeMultiverseActivePage('pvp');
                        }}></Button>
                        <Button value={t('multiverse.fighters')} colorType="brown" onClick={(e) => {
                            changeMultiverseActivePage('fighters');
                        }}></Button>
                        <Button value={t('multiverse.bag')} colorType="green" onClick={(e) => {
                            changeMultiverseActivePage('bag');
                        }}></Button>
                        <Button value={t('multiverse.shop')} colorType="yellow" onClick={(e) => {
                            changeMultiverseActivePage('shop');
                        }}></Button>
                        <Button value={t('multiverse.config')} colorType="blue" onClick={(e) => {
                            changeMultiverseActivePage('config');
                        }}></Button>
                        <Button value={t('multiverse.users')} colorType="blue" onClick={(e) => {
                            changeMultiverseActivePage('users');
                        }}></Button>
                    </div>
                </div>
            }
            {multiverseActivePage === "mainMenu" && !user && <Loading></Loading>}
            {multiverseActivePage === "fighters" && <FightersPage
                updateUser={updateUser} changeMultiverseActivePage={changeMultiverseActivePage} user={user}></FightersPage>}
            {multiverseActivePage === "bag" && <ObjectsPage changeMultiverseActivePage={changeMultiverseActivePage} user={user}></ObjectsPage>}
            {multiverseActivePage === "shop" && <ShopPage changeMultiverseActivePage={changeMultiverseActivePage} ></ShopPage>}
            {multiverseActivePage === "users" && <UsersPage changeMultiverseActivePage={changeMultiverseActivePage} ></UsersPage>}
            {multiverseActivePage === "config" && <SettingsPage updateUser={updateUser} user={user} changeMultiverseActivePage={changeMultiverseActivePage} ></SettingsPage>}
            {multiverseActivePage === "missions" && <MissionsPage changeActivePage={changeActivePage} user={user} changeMultiverseActivePage={changeMultiverseActivePage} ></MissionsPage>}
            {multiverseActivePage === "pvp" && <MatchMaking changeActivePage={changeActivePage} user={user} changeMultiverseActivePage={changeMultiverseActivePage} ></MatchMaking>}
        </div >
    )
}
export default memo(Multiverse)