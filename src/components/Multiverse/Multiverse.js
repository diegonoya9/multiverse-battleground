import { memo, useState, useEffect } from "react"
import FightersPage from "./FightersPage.js"
import ObjectsPage from "./ObjectsPage.js"
import useUser from "../Hooks/use-user.js"
import classes from './Multiverse.module.css'

import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/Aeroplane.WAV"

const Multiverse = ({ changeActivePage }) => {
    const audioStyle = {
        display: 'none', // Oculta el reproductor de audio visualmente
    };
    const [multiverseActivePage, setMultiverseActivePage] = useState("mainMenu")
    const changeMultiverseActivePage = (activePage) => {
        setMultiverseActivePage(activePage)
    }
    const { user } = useUser("multiverse")
    const [money, setMoney] = useState()
    useEffect(() => {
        if (user) {
            let newMoney = user.objects.filter((object) => {
                return object.name === "money"
            })
            setMoney(newMoney[0].quantity)
        }
    }, [user])
    return (
        <div>
            {multiverseActivePage === "mainMenu" && user &&
                <div>
                    <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
                    <h1 className={classes.h1}>Welcome {user.name}</h1>
                    <h2 className={classes.h2}>You have {money} pesos</h2>
                    <input type="submit" onClick={(e) => { changeActivePage(2); }} value={'Fight'} />
                    <input type="submit" onClick={(e) => { changeMultiverseActivePage("fighters") }} value={'Fighters'} />
                    <input type="submit" onClick={(e) => { changeMultiverseActivePage("bag") }} value={'Bag'} />
                    <input type="submit" onClick={(e) => { }} value={'Shop'} />
                </div>
            }
            {multiverseActivePage === "fighters" && <FightersPage changeMultiverseActivePage={changeMultiverseActivePage} user={user}></FightersPage>}
            {multiverseActivePage === "bag" && <ObjectsPage changeMultiverseActivePage={changeMultiverseActivePage} ></ObjectsPage>}
        </div>
    )
}
export default memo(Multiverse)