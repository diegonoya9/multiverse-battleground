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
    const modalPurchaseConfirmed = <div><h1 style={{ color: 'black' }}>Purchase confirmed!</h1>
        <button className={classes.modalButton} onClick={() => setShowModal(false)}>
            Keep Buying
        </button></div>
    const [objects, setObjects] = useState()
    const { userContext } = useContext(MyContext);
    let activeUser = userContext.idUsuario
    let backEndUrl = userContext.backEndUrl
    const [fighters, setFighters] = useState()
    const [user, setUser] = useState()
    const [modalContent, setModalContent] = useState()
    const [showModal, setShowModal] = useState(false)
    const closeModal = () => {
        if (modalContent !== "Processing.. Please wait") {
            setShowModal(false)
        }
    }

    const audioStyle = {
        display: 'none',
    };
    const buy = (id, price, type) => {
        let newMoney = user.userobjects.filter((object) => {
            return object.name === "Money"
        })
        let newUser = user
        if (newMoney[0].quantity >= price) {
            setModalContent("Processing.. Please wait")
            setShowModal(true)
            newMoney[0].quantity -= price;
            if (type === "fighter") {
                const parameters = [{
                    fighter_id: id,
                    user_id: newUser.user_id
                }]
                fetch(backEndUrl + "/buyFighter", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(parameters)
                }).then(response => {
                    if (response.statusText === "OK") {
                        setModalContent(modalPurchaseConfirmed)
                        setShowModal(true)
                    } else {
                        setModalContent('Error when buying')
                        setShowModal(true)
                    }
                })
            }
            if (type === "object") {
                let newObject = objects.filter((object) => {
                    return object.name === id
                })
                const parameters = [{
                    object_id: newObject[0].object_id,
                    user_id: newUser.user_id
                }]
                fetch(backEndUrl + "/buyObject", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(parameters)
                })
                    .then(response => {
                        if (response.statusText === "OK") {
                            setModalContent(modalPurchaseConfirmed)
                            setShowModal(true)
                        } else {
                            setModalContent('Error when buying')
                            setShowModal(true)
                        }
                    })
            }
        } else {
            setModalContent('Not enough money')
            setShowModal(true)
        }
    }
    useEffect(() => {
        fetch(backEndUrl + '/allusers/' + activeUser)
            .then(response => response.json())
            .then(data => {
                setUser(data[0])
            })
        fetch(backEndUrl + '/allobjects')
            .then((response) => response.json())
            .then((objectsList) => {
                objectsList = objectsList.filter((object) => {
                    return object.name !== "Money"
                })
                setObjects(objectsList)
            })
        fetch(backEndUrl + '/allfighters')
            .then((response) => response.json())
            .then((data) => { setFighters(data) })
    }, [activeUser, backEndUrl])
    return (<div className={classes.backgroundImg}>
        <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
        {user && <h1 className={classes.divBackground}>Current money:{user.userobjects.map((object) => {
            if (object.name === "Money") {
                return object.quantity
            }
            return ''
        })}</h1>}
        {showModal && <Modal onClose={closeModal} styleType="battlegroundColiseum" >
            {modalContent}
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
                            <Button className={classes.buyButton} onClick={() => buy(fighter.fighter_id, fighter.price, "fighter")}>BUY</Button>
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