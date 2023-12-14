import { memo, useState, useEffect, useContext } from "react"
import FightersPage from "./FightersPage.js"
import ObjectsPage from "./ObjectsPage.js"
import UsersPage from './UsersPage.js'
import classes from './Multiverse.module.css'
import ShopPage from "./ShopPage.js"
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/Aeroplane.WAV"
import Button from "../UI/Button.js"
import { MyContext } from '../../context/MyContext';

const Multiverse = ({ changeActivePage }) => {
    const audioStyle = {
        display: 'none', // Oculta el reproductor de audio visualmente
    };
    const { userContext, setUserId } = useContext(MyContext);
    let activeUser = userContext.idUsuario
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
    const updateUser = () => {
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/users/' + activeUser + '.json')
            .then(response => response.json())
            .then(data => { setUser(data) })
    }
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
                    <Button value='Fight' colorType="red" onClick={() => changeActivePage(2)}></Button>
                    <Button value='Fighters' colorType="brown" onClick={(e) => {
                        changeMultiverseActivePage('fighters');
                    }}></Button>
                    <Button value='Bag' colorType="green" onClick={(e) => {
                        changeMultiverseActivePage('bag');
                    }}></Button>
                    <Button value='Shop' colorType="yellow" onClick={(e) => {
                        changeMultiverseActivePage('shop');
                    }}></Button>
                    <Button value='Users' colorType="blue" onClick={(e) => {
                        changeMultiverseActivePage('users');
                    }}></Button>
                </div>
            )}
            {multiverseActivePage === "fighters" && <FightersPage
                updateUser={updateUser} changeMultiverseActivePage={changeMultiverseActivePage} user={user}></FightersPage>}
            {multiverseActivePage === "bag" && <ObjectsPage changeMultiverseActivePage={changeMultiverseActivePage} user={user}></ObjectsPage>}
            {multiverseActivePage === "shop" && <ShopPage changeMultiverseActivePage={changeMultiverseActivePage} ></ShopPage>}
            {multiverseActivePage === "users" && <UsersPage changeMultiverseActivePage={changeMultiverseActivePage} ></UsersPage>}
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