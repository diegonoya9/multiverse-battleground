import classes from "./FightersPage.module.css"
import ReactAudioPlayer from 'react-audio-player';
import Modal from "../UI/Modal";
import { useState, useContext, useEffect } from "react";
import musicFile from "../../assets/sounds/music/DirtyLove.WAV"
import Button from "../UI/Button";
import { MyContext } from "../../context/MyContext";
import FighterCard from "../UI/FighterCard";
const FightersPage = ({ user, changeMultiverseActivePage, updateUser }) => {
    const priceTags = document.querySelectorAll(".fighterPriceBlock")
    priceTags.forEach(tag => {
        tag.style.display = "none"
    });;
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState()
    const { userContext } = useContext(MyContext);
    const [fighters, setFighters] = useState()
    const [moves, setMoves] = useState()
    const [actions, setActions] = useState()
    const [showMoves, setShowMoves] = useState(false)
    const [showActions, setShowActions] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showNotInParty, setShowNotInParty] = useState(false)
    const [userFighterId, setUserFighterId] = useState(false)
    const [allowCloseModal, setAllowCloseModal] = useState(true)
    let backEndUrl = userContext.backEndUrl
    let activeUser = userContext.idUsuario
    const audioStyle = {
        display: 'none',
    };
    const closeModal = () => {
        if (allowCloseModal) {
            setShowActions(false)
            setShowMoves(false)
            setShowModal(false)
            setShowConfirm(false)
            setShowNotInParty(false)
            setModalContent()
        }
    }
    const addToParty = (userFighterId) => {
        let newUser = user
        let cant = 0
        let cantExceeded = false
        /* Checks if there are already 4 fighters in the party */
        newUser.userfighters.forEach((fighter) => {
            if (fighter.in_party === "true") {
                cant++
            }
            if (cant === 4) {
                cantExceeded = true
            }
        })
        if (cantExceeded) {
            setAllowCloseModal(true)
            setShowModal(true)
        } else {
            const parameters = [{
                user_fighter_id: userFighterId
            }]
            setModalContent('Adding to party...')
            setAllowCloseModal(false)
            setShowModal(true)
            fetch(backEndUrl + "/addtoparty", {
                method: 'POST', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parameters),
            }).then(() => {
                updateFighters()
            })
        }
    }
    const removeFromParty = (user_fighter_id) => {
        let newUser = user
        const parameters = [{
            user_fighter_id,
            user_id: newUser.user_id
        }]
        setModalContent('Removing from party...')
        setAllowCloseModal(false)
        setShowModal(true)
        fetch(backEndUrl + "/removefromparty", {
            method: 'POST', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        }).then(() => updateFighters())

    }
    const viewActions = (move_id) => {
        let actions = []
        moves.forEach((move) => {
            if (move.move_id === move_id) {
                actions.push(move.actionmoves)
            }
        })
        setActions(actions[0])
        setShowActions(true)
        setShowModal(true)
    }
    const viewMovements = (user_fighter_id) => {
        let moves = []
        fighters.forEach((fighter, index) => {
            if (fighter.user_fighter_id === user_fighter_id) {
                fighter.moves.forEach((move) => {
                    moves.push(move.moves)
                })
            }
        })
        setAllowCloseModal(true)
        setMoves(moves)
        setShowMoves(true)
        setShowModal(true)
    }
    const setFirstFighter = (user_fighter_id) => {
        const parameters = [{
            user_id: user.user_id,
            user_fighter_id
        }]
        setModalContent('Assigning first fighter')
        setShowModal(true)
        setAllowCloseModal(false)
        fetch(backEndUrl + "/setfirstfighter", {
            method: 'POST', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        }).then(() => {
            updateFighters()
        })
    }
    const deleteFighter = (userFighterId) => {
        setUserFighterId(userFighterId)
        setShowConfirm(true)
        setShowModal(true)
    }
    const deleteUserFighter = async (userFighterId) => {
        let deleteFighter = await user.fighters.filter((fighter) => {
            return fighter.userFighterId === userFighterId
        })
        let newFighters = user.fighters.filter((fighter) => {
            return fighter.userFighterId !== userFighterId
        })
        const sell = user.objects[4].quantity
        let price = deleteFighter[0].price
        const result = sell + price
        let newUser = user
        newUser.objects[4].quantity = result
        newUser.fighters = newFighters
        setShowModal(false)
        setShowConfirm(false)
    }
    const updateFighters = () => {
        fetch(backEndUrl + "/alluserfighters/" + activeUser
        ).then((response) => response.json())
            .then(data => {
                setFighters(data)
            })
    }

    useEffect(() => {
        setShowModal(false)
        setModalContent()
    }, [fighters])
    useEffect(() => {
        updateFighters()
    }, [])
    return (<div className={`${classes.body} ${classes.backgroundImg}`}>
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
        <div className={classes.container} >
            <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
            {fighters &&
                fighters.map((fighter, i) => {
                    return (<div className={classes.fighterContainer} key={fighter.user_fighter_id}>
                        <FighterCard fighter={fighter}></FighterCard>
                        <Button onClick={() => { if (fighter.in_party === "true") { setFirstFighter(fighter.user_fighter_id) } else { setShowNotInParty(true); setShowModal(true) } }} value="First in battle"></Button>
                        <Button onClick={() => { viewMovements(fighter.user_fighter_id) }} value="View movements"></Button>
                        {fighter.in_party === "true" ?
                            <Button onClick={() => { removeFromParty(fighter.user_fighter_id) }} value="Remove from party"></Button>
                            :
                            <Button onClick={() => { addToParty(fighter.user_fighter_id) }} value="Add to party"></Button>
                        }
                        <Button onClick={() => { deleteFighter(fighter.user_fighter_id) }} value="Sell Fighter"></Button>
                    </div>
                    );
                })}
        </div>
        {showModal && !modalContent && <Modal styleType={"battlegroundColiseum"} onClose={closeModal} color="white">
            {showMoves && moves && !showConfirm && !showActions && <ul>{moves.map((move) => {
                return <Button key={move.name} onClick={() => { viewActions(move.move_id) }}>
                    {move.name}
                </Button>
            })} </ul>}
            {showActions && actions &&
                actions.map((action, index) => {
                    return <div key={Math.random()} >
                        <p>Action: {index + 1}</p>
                        <p>Inflicted on: {action.inflicted_on}</p>
                        <p>Type: {action.attack_type}</p>
                        <p>Field: {action.field}</p>
                        <p>Value: {action.value}</p>
                    </div>
                })
            }
            {!showMoves && !showConfirm && !showNotInParty && !modalContent && < h1 > No se puede bro.. máximo 4</h1>}
            {showConfirm && <div>
                <h3>Are you sure you want to sell this fighter?</h3>
                <Button onClick={() => deleteUserFighter(userFighterId)}>Sell</Button>
            </div>}
            {showNotInParty && < h1 > Hay que agregarlo al party primero</h1>}
        </Modal>}
        {showModal && modalContent && <Modal styleType={"battlegroundColiseum"} onClose={closeModal} color="white">
            {modalContent}
        </Modal>}
    </div >
    );

}

export default FightersPage