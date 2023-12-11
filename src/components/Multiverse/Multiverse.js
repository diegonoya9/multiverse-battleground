import { memo, useState, useEffect } from "react"
import FightersPage from "./FightersPage.js"
import ObjectsPage from "./ObjectsPage.js"
import classes from './Multiverse.module.css'
import ShopPage from "./ShopPage.js"
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/DirtyLove.WAV"

const Multiverse = ({ changeActivePage }) => {
    const audioStyle = {
        display: 'none', // Oculta el reproductor de audio visualmente
    };
    let activeUser
    if (process.env.NODE_ENV === 'production') {
        // Código específico para el entorno de desarrollo
        activeUser = 2
    } else if (process.env.NODE_ENV === 'development') {
        // Código específico para el entorno de producción
        activeUser = 1
    }
    const [multiverseActivePage, setMultiverseActivePage] = useState("mainMenu")
    const changeMultiverseActivePage = (activePage) => {
        setMultiverseActivePage(activePage)
    }
    const [user, setUser] = useState()
    const [money, setMoney] = useState()
    useEffect(() => {
        if (user) {
            let newMoney = user.objects.filter((object) => {
                return object.name === "money"
            })
            setMoney(newMoney[0].quantity)
        }
    }, [user])
    useEffect(() => {
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/users/' + activeUser + '.json')
            .then(response => response.json())
            .then(data => { setUser(data) })
        const audio = document.getElementById('audioPlayer');
        if (audio) {
            audio.play()
        }
    }, [])
    useEffect(() => {
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/users/' + activeUser + '.json')
            .then(response => response.json())
            .then(data => { setUser(data) })
    }, [multiverseActivePage])
    return (
        <div className={classes.container}>
            {multiverseActivePage === 'mainMenu' && user && (
                <div className={`${classes.mainMenu} ${classes.container}`}>
                    <ReactAudioPlayer src={musicFile} autoPlay id="audioPlayer" controls style={audioStyle} />
                    <h1 className={classes.h1}>Welcome {user.name}</h1>
                    <h2 className={classes.h2}>You have {money} pesos</h2>
                    <input
                        type="submit"
                        onClick={(e) => {
                            changeActivePage(2);
                        }}
                        className={`${classes.fightButton} ${classes.menuButton}`}
                        value={'Fight'}
                    />
                    <input
                        type="submit"
                        onClick={(e) => {
                            changeMultiverseActivePage('fighters');
                        }}
                        className={`${classes.fightersButton} ${classes.menuButton}`}
                        value={'Fighters'}
                    />
                    <input
                        type="submit"
                        onClick={(e) => {
                            changeMultiverseActivePage('bag');
                        }}
                        className={`${classes.bagButton} ${classes.menuButton}`}
                        value={'Bag'}
                    />
                    <input
                        type="submit"
                        onClick={(e) => {
                            changeMultiverseActivePage('shop');
                        }}
                        className={`${classes.shopButton} ${classes.menuButton}`}
                        value={'Shop'}
                    />
                </div>
            )}
            {multiverseActivePage === "fighters" && <FightersPage changeMultiverseActivePage={changeMultiverseActivePage} user={user}></FightersPage>}
            {multiverseActivePage === "bag" && <ObjectsPage changeMultiverseActivePage={changeMultiverseActivePage} user={user}></ObjectsPage>}
            {multiverseActivePage === "shop" && <ShopPage changeMultiverseActivePage={changeMultiverseActivePage} ></ShopPage>}
        </div>

        /*<div>
            {multiverseActivePage === "mainMenu" && user &&
                <div>
                    <ReactAudioPlayer src={musicFile} autoPlay id="audioPlayer" controls style={audioStyle} />
                    <h1 className={classes.h1}>Welcome {user.name}</h1>
                    <h2 className={classes.h2}>You have {money} pesos</h2>
                    <input type="submit" onClick={(e) => { changeActivePage(2); }} value={'Fight'} />
                    <input type="submit" onClick={(e) => { changeMultiverseActivePage("fighters") }} value={'Fighters'} />
                    <input type="submit" onClick={(e) => { changeMultiverseActivePage("bag") }} value={'Bag'} />
                    <input type="submit" onClick={(e) => { changeMultiverseActivePage("shop") }} value={'Shop'} />
                </div>
            }
            {multiverseActivePage === "fighters" && <FightersPage changeMultiverseActivePage={changeMultiverseActivePage} user={user}></FightersPage>}
            {multiverseActivePage === "bag" && <ObjectsPage changeMultiverseActivePage={changeMultiverseActivePage} user={user}></ObjectsPage>}
            {multiverseActivePage === "shop" && <ShopPage changeMultiverseActivePage={changeMultiverseActivePage} ></ShopPage>}
        </div>*/
    )
}
export default memo(Multiverse)