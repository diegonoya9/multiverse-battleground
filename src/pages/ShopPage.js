import classes from "./ShopPage.module.css"
import { memo, useEffect, useState, useContext } from "react";
import Modal from "../components/UI/Modal";
import Button from "../components/UI/Button";
import { MyContext } from "../context/MyContext";
import FighterCard from "../components/UI/FighterCard";
import ObjectCard from "../components/UI/ObjectCard";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
const ShopPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const modalPurchaseConfirmed = <div><h1 style={{ color: 'black' }}>Purchase confirmed!</h1>
        <button className={classes.modalButton} onClick={() => setShowModal(false)}>
            Keep Buying
        </button></div>
    const [objects, setObjects] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [currentObject, setCurrentObject] = useState()
    const [quantity, setQuantity] = useState(1)
    const { userContext } = useContext(MyContext);
    let activeUser = userContext.idUsuario
    let backEndUrl = userContext.backEndUrl
    const [fighters, setFighters] = useState()
    const [user, setUser] = useState()
    const [userMoney, setUserMoney] = useState()
    const [modalContent, setModalContent] = useState()
    const [showModal, setShowModal] = useState(false)
    const closeModal = () => {
        if (modalContent !== "Processing.. Please wait") {
            setShowModal(false)
        }
    }
    const changeQuantity = (action) => {
        if (action === "increase") {
            if (quantity < 100) {
                setTotalPrice(currentObject.price * (quantity + 1))
                setQuantity((prevValue) => {
                    prevValue++
                    return prevValue
                })
            }
        }
        if (action === "decrease") {
            if (quantity > 0) {
                setTotalPrice(currentObject.price * (quantity - 1))
                setQuantity((prevValue) => {
                    prevValue--
                    return prevValue
                })
            }
        }
    }
    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        setTotalPrice(currentObject.price * newQuantity)
        setQuantity(newQuantity)
    }
    const buy = (id, price, type) => {
        let newUser = user
        if (userMoney >= price) {
            if (type === "fighter") {
                setUserMoney((prevValue) => {
                    prevValue -= price
                    return prevValue
                })
                setModalContent("Processing.. Please wait")
                setShowModal(true)
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
                    if (response.ok) {
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
                setTotalPrice(newObject[0].price)
                setQuantity(1)
                setCurrentObject(newObject[0])
                setModalContent()
                setShowModal(true)
            }
        } else {
            setModalContent('Not enough money')
            setShowModal(true)
        }
    }
    const buyObject = () => {
        const parameters = [{
            object_id: currentObject.object_id,
            user_id: user.user_id,
            quantity
        }]
        setUserMoney((prevValue) => {
            prevValue -= currentObject.price * quantity
            return prevValue
        })
        setModalContent("Processing.. Please wait")
        setShowModal(true)
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
    useEffect(() => {
        fetch(backEndUrl + '/allusers/' + activeUser)
            .then(response => response.json())
            .then(data => {
                setUser(data[0])
            }).then(() => {
                fetch(backEndUrl + '/allobjects')
                    .then((response) => response.json())
                    .then(objectsList => {
                        objectsList = objectsList.filter((object) => {
                            return object.name !== "Money"
                        })
                        setObjects(objectsList)
                    }).then(() => {
                        fetch(backEndUrl + '/allfightersinitiallevel')
                            .then((response) => response.json())
                            .then((data) => { setFighters(data) 
                            })
                    })

            })
    }, [activeUser, backEndUrl])
    useEffect(() => {
        if (user) {
            user.userobjects.forEach((object) => {
                if (object.name === "Money") {
                    setUserMoney(object.quantity)
                }
            })
        }
    }, [user])
    const objectQuantity = currentObject && userMoney && <div>
        <p>{currentObject.name}</p>
        <p>Total Price:{totalPrice}</p>
        <div>
            Quantity:{quantity}
            <Button value="-" onClick={() => changeQuantity("decrease")} />
            <input
                type="range"
                min="0"
                max={userMoney / currentObject.price}
                step="1"
                value={quantity}
                onChange={(event) => handleQuantityChange(event)}
            />
            <Button value="+" onClick={() => changeQuantity("increase")} />
        </div>
        <Button value="Buy object" onClick={() => buyObject()} />
    </div>
    return (<div className={classes.backgroundImg}>
        <Button colorType="lightgreen" value={t('shoppage.main')} onClick={() => { navigate('/') }}></Button>
        {user && userMoney && <h1 className={classes.divBackground}>{t('shoppage.money')}:{userMoney}</h1>}
        {showModal && modalContent && <Modal onClose={closeModal} styleType="battlegroundColiseum" >
            {modalContent}
        </Modal>}
        {showModal && !modalContent && <Modal onClose={closeModal} styleType="battlegroundColiseum" >
            {objectQuantity}
        </Modal>
        }
        <h1 className={classes.divBackground}>{t('shoppage.objects')}:</h1>
        {objects && <div className={classes.container} >
            {objects &&
                objects.map((object) => {
                    return (
                        <div className={classes.objectContainer} key={object.name}>
                            <ObjectCard showPrice={true} object={object}></ObjectCard>
                            <Button className={classes.buyButton} onClick={() => buy(object.name, object.price, "object")}>{t('shoppage.buy')}</Button>
                        </div>
                    );
                })}
        </div>

        }

        {fighters && <div><h1 className={classes.divBackground}>{t('shoppage.fighters')}:</h1><div className={classes.container} >
            {fighters &&
                fighters.map((fighter) => {
                    return (
                        <div className={classes.objectContainer} key={fighter.fighter_id}>
                            <FighterCard showPrice={true} fighter={fighter}></FighterCard>
                            <Button className={classes.buyButton} onClick={() => buy(fighter.fighter_id, fighter.price, "fighter")}>{t('shoppage.buy')}</Button>
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