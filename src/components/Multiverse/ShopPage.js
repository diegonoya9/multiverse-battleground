import classes from "./ShopPage.module.css"
import { memo, useEffect, useState, useContext } from "react";
import ReactAudioPlayer from 'react-audio-player';
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import musicFile from "../../assets/sounds/music/OverNow.WAV"
import { MyContext } from "../../context/MyContext";
import FighterCard from "../UI/FighterCard";
import ObjectCard from "../UI/ObjectCard";
const ShopPage = ({ changeMultiverseActivePage }) => {
    const [objects, setObjects] = useState()
    const { userContext } = useContext(MyContext);
    let activeUser = userContext.idUsuario
    const [fighters, setFighters] = useState()
    const [user, setUser] = useState()
    const [showModal, setShowModal] = useState(false)
    const closeModal = () => {
        setShowModal(false)
    }
    const audioStyle = {
        display: 'none',
    };
    const buy = (id, price, type) => {
        let newMoney = user.objects.filter((object) => {
            return object.name === "money"
        })
        let newUser = user
        if (newMoney[0].quantity >= price) {
            newMoney[0].quantity -= price;
            if (type === "fighter") {
                let newFighter = fighters.filter((fighter) => {
                    return fighter.fighterId === id
                })
                let newUserFighterId = -1
                newUser.fighters.forEach((fighter) => {
                    if (fighter.userFighterId > newUserFighterId) {
                        newUserFighterId = fighter.userFighterId
                    }
                })
                newFighter[0].userFighterId = (newUserFighterId + 1)
                newUser.fighters.push(newFighter[0])
                newUser.objects.forEach((object) => {
                    if (object.name === "money") {
                        object.quantity = newMoney[0].quantity
                    }
                    setShowModal(true)
                    return object
                })
                fetch("https://multiverse-battleground-default-rtdb.firebaseio.com/users/" + activeUser + ".json", {
                    method: 'PATCH', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                }).then(fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/users/' + activeUser + '.json')
                    .then(response => response.json())
                    .then(data => {
                        setUser(data)
                    }))
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
                const parameters = [{
                    object_id: newObject[0].object_id,
                    user_id: newUser.userId
                }]
                fetch("https://graceful-capris-deer.cyclic.app/api/buy", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(parameters)
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
                /*fetch("https://multiverse-battleground-default-rtdb.firebaseio.com/users/" + activeUser + ".json", {
                    method: 'PATCH', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                })*/
                setShowModal(true)
            }
        } else {
            console.log('not enough money')
        }
    }
    useEffect(() => {
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/users/' + activeUser + '.json')
            .then(response => response.json())
            .then(data => {
                setUser(data)
            })
        fetch('https://graceful-capris-deer.cyclic.app/api/allobjects')
            .then((response) => response.json())
            .then((objectsList) => {
                objectsList = objectsList.filter((object) => {
                    return object.name !== "money"
                })
                setObjects(objectsList)
            })
        fetch('https://graceful-capris-deer.cyclic.app/api/allfighters')
            .then((response) => response.json())
            .then((data) => { setFighters(data) })
    }, [activeUser])
    return (<div className={classes.backgroundImg}>
        <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
        {user && <h1 className={classes.divBackground}>Current money:{user.objects.map((object) => {
            if (object.name === "money") {
                return object.quantity
            }
            return ''
        })}</h1>}
        {showModal && <Modal onClose={closeModal} styleType="battlegroundColiseum" >
            <h1 style={{ color: 'black' }}>Purchase confirmed!</h1>
            <button className={classes.modalButton} onClick={() => setShowModal(false)}>
                Keep Buying
            </button>
        </Modal>}
        <h1 className={classes.divBackground}>OBJECTS:</h1>
        {objects && <div className={classes.container} >
            {objects &&
                objects.map((object) => {
                    return (
                        <div className={classes.objectContainer} key={object.name}>
                            <ObjectCard showPrice={true} object={object}></ObjectCard>
                            <Button className={classes.buyButton} onClick={() => buy(object.name, object.price, "object")}>BUY</Button>
                        </div>
                    );
                })}
        </div>

        }

        {fighters && <div><h1 className={classes.divBackground}>FIGHTERS:</h1><div className={classes.container} >
            {fighters &&
                fighters.map((fighter) => {
                    return (
                        <div className={classes.objectContainer} key={fighter.fighterId}>
                            <FighterCard showPrice={true} fighter={fighter}></FighterCard>
                            <Button className={classes.buyButton} onClick={() => buy(fighter.fighterId, fighter.price, "fighter")}>BUY</Button>
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