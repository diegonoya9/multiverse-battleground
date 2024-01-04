import { memo, useState, useEffect, useContext } from "react"
import FightersPage from "./FightersPage.js"
import ObjectsPage from "./ObjectsPage.js"
import UsersPage from './UsersPage.js'
import SettingsPage from './SettingsPage.js'
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
    const { userContext, setUserName,setSound,setBg,setSfx } = useContext(MyContext);
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
    useEffect(() => {
        fetch(backEndUrl + '/allusers/' + activeUser)
            .then(response => response.json())
            .then(data => setUser(data[0]))
        const audio = document.getElementById('audioPlayer');
        if (audio) {
            audio.play()
        }
    }, [activeUser])
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
                    <ReactAudioPlayer src={musicFile} volume={bg/100} autoPlay id="audioPlayer" controls style={audioStyle} />
                    <div id="divWelcome" className={classes.divWelcome}>
                        <h1 className={classes.h1}>{t('multiverse.welcome')} {user.name}</h1>
                        <h2 className={classes.h2}>{t('multiverse.money')} {money} pesos</h2>
                    </div>
                    <div className={classes.btnContainer} >
                        <Button value={t('multiverse.fight')} colorType="red" onClick={() => changeActivePage(2)}></Button>
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
            {multiverseActivePage === "config" && <SettingsPage updateUser={updateUser}user={user} changeMultiverseActivePage={changeMultiverseActivePage} ></SettingsPage>}
        </div >
    )
}
export default memo(Multiverse)