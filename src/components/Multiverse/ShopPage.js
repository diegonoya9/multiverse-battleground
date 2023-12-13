import classes from "./ShopPage.module.css"
import { memo, useEffect, useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/OverNow.WAV"
const ShopPage = ({ changeMultiverseActivePage }) => {
    const [objects, setObjects] = useState()
    const [fighters, setFighters] = useState()
    const [user, setUser] = useState()
    const [showModal, setShowModal] = useState(false)
    const audioStyle = {
        display: 'none',
    };
    const buy = (id, price, type) => {
        let newMoney = user.objects.filter((object) => {
            return object.name === "money"
        })
        if (newMoney[0].quantity >= price) {
            newMoney[0].quantity -= price;
            let newUser = user
            if (type === "fighter") {
                let newFighter = fighters.filter((fighter) => {
                    return fighter.fighterId === id
                })
                newUser.fighters.push(newFighter[0])
                newUser.objects.forEach((object) => {
                    if (object.name === "money") {
                        object.quantity = newMoney[0].quantity
                    }
                    return object
                })
                setUser(newUser)
                let activeUser
                if (process.env.NODE_ENV === 'production') {
                    // Código específico para el entorno de desarrollo
                    activeUser = 2
                } else if (process.env.NODE_ENV === 'development') {
                    // Código específico para el entorno de producción
                    activeUser = 1
                }
                fetch("https://multiverse-battleground-default-rtdb.firebaseio.com/users/" + activeUser + ".json", {
                    method: 'PATCH', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                })
            }
            if (type === "object") {
                let newObject = objects.filter((object) => {
                    return object.name === id
                })
                let addedQuantity = false
                newUser.objects.forEach((object) => {
                    if (object.name === newObject[0].name) {
                        object.quantity++
                        addedQuantity = true
                    }
                })
                if (!addedQuantity) {
                    newUser.objects.push(newObject[0])
                }
                newUser.objects.forEach((object) => {
                    if (object.name === "money") {
                        object.quantity = newMoney[0].quantity
                    }
                    return object
                })
                setUser(newUser)
                let activeUser
                if (process.env.NODE_ENV === 'production') {
                    // Código específico para el entorno de desarrollo
                    activeUser = 2
                } else if (process.env.NODE_ENV === 'development') {
                    // Código específico para el entorno de producción
                    activeUser = 1
                }
                fetch("https://multiverse-battleground-default-rtdb.firebaseio.com/users/" + activeUser + ".json", {
                    method: 'PATCH', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                })
                setShowModal(true)
            }
        } else {
            console.log('not enough money')
        }
    }
    useEffect(() => {
        let activeUser
        if (process.env.NODE_ENV === 'production') {
            // Código específico para el entorno de desarrollo
            activeUser = 2
        } else if (process.env.NODE_ENV === 'development') {
            // Código específico para el entorno de producción
            activeUser = 1
        }
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/users/' + activeUser + '.json')
            .then(response => response.json())
            .then(data => {
                setUser(data)
            })
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/gameObjects.json')
            .then((response) => response.json())
            .then((objectsList) => {
                objectsList = objectsList.filter((object) => {
                    return object.name !== "money"
                })
                setObjects(objectsList)
            })
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/fighters.json')
            .then((response) => response.json())
            .then((data) => { setFighters(data) })
    }, [])
    return (<div>
        <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
        {user && <h1 className={classes.h1}>Current money:{user.objects.map((object) => {
            if (object.name === "money") {
                return object.quantity
            }
        })}</h1>}
        {showModal && <div className={classes.modalWrapper}>
            <div className={classes.modalContainer}>
                <div className={classes.modalContent}>
                    <h1 style={{ color: '#ff4500' }}>Purchase confirmed!</h1>
                    <button className={classes.modalButton} onClick={() => setShowModal(false)}>
                        Keep Buying
                    </button>
                </div>
            </div>
        </div>}
        <button value="Back to Main Menu" className={classes.backToMainMenuBtn} onClick={() => { changeMultiverseActivePage("mainMenu") }} >Back to Main Menu </button>
        <h1 className={classes.h1}>OBJECTS:</h1>
        {objects && <div className={classes.container} >
            {objects &&
                objects.map((object) => {
                    return (
                        <div className={classes.objectContainer} key={object.name}>
                            <span className={classes.objectName}>{object.name}</span>
                            <div className={classes.imageContainer}>
                                <img alt="object" src={object.img} className={classes.objectImg} />
                            </div>
                            <span className={classes.objectName}>Price: {object.price}</span>
                            <button className={classes.buyButton} onClick={() => buy(object.name, object.price, "object")}>BUY</button>
                        </div>
                    );
                })}
        </div>

        }
        {fighters && <div><h1 className={classes.h1}>FIGHTERS:</h1><div className={classes.container} >
            {fighters &&
                fighters.map((fighter) => {
                    return (
                        <div className={classes.objectContainer} key={fighter.fighterId}>
                            <span className={classes.objectName}>{fighter.name}</span>
                            <div className={classes.imageContainer}>
                                <img alt="fighter" src={fighter.imgFront} className={classes.objectImg} />
                            </div>
                            <span className={classes.objectName}>Price: {fighter.price}</span>
                            <button className={classes.buyButton} onClick={() => buy(fighter.fighterId, fighter.price, "fighter")}>BUY</button>
                        </div>
                    );
                })}
        </div>
        </div>
        }
    </div>
    );

}

export default memo(ShopPage)