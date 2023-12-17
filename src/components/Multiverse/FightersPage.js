import classes from "./FightersPage.module.css"
import ReactAudioPlayer from 'react-audio-player';
import Modal from "../UI/Modal";
import { useState, useContext } from "react";
import musicFile from "../../assets/sounds/music/DirtyLove.WAV"
import Button from "../UI/Button";
import { MyContext } from "../../context/MyContext";
import FighterCard from "../UI/FighterCard";
const FightersPage = ({ user, changeMultiverseActivePage, updateUser }) => {
    const [showModal, setShowModal] = useState(false)
    const { userContext } = useContext(MyContext);
    const [moves, setMoves] = useState()
    const [actions, setActions] = useState()
    const [showMoves, setShowMoves] = useState(false)
    const [showActions, setShowActions] = useState(false)
    let activeUser = userContext.idUsuario
    const audioStyle = {
        display: 'none',
    };
    const closeModal = () => {
        setShowActions(false)
        setShowMoves(false)
        setShowModal(false)
    }
    const addToParty = (userFighterId) => {
        let newUser = user
        let cant = 0
        let cantExceeded = false
        newUser.fighters.forEach((fighter, index) => {
            if (fighter.inParty) {
                cant++
            }
            if (cant === 4) {
                cantExceeded = true
            }
        })
        if (cantExceeded) {
            setShowModal(true)
        } else {
            newUser.fighters.forEach((fighter, index) => {
                if (fighter.userFighterId === userFighterId) {
                    fighter.inParty = true
                    if (cant === 0) {
                        fighter.active = true
                    }
                }
            })
            fetch("https://multiverse-battleground-default-rtdb.firebaseio.com/users/" + activeUser + ".json", {
                method: 'PATCH', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            }).then(() => updateUser())
        }
    }
    const removeFromParty = (userFighterId) => {
        let newUser = user
        let setNewFirst = false
        newUser.fighters.forEach((fighter, index) => {
            if (fighter.userFighterId === userFighterId) {
                fighter.inParty = false
                if (fighter.active) {
                    fighter.active = false
                    setNewFirst = true
                }
            }
        })
        if (setNewFirst) {
            let firstSetted = false
            newUser.fighters.forEach((fighter, index) => {
                if ((fighter.inParty === true) && !firstSetted) {
                    fighter.active = true
                    firstSetted = true
                }
            })
        }
        fetch("https://multiverse-battleground-default-rtdb.firebaseio.com/users/" + activeUser + ".json", {
            method: 'PATCH', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        }).then(() => updateUser())

    }
    const viewActions = (moveName) => {
        let actions = []
        moves.forEach((move) => {
            if (move.name === moveName) {
                actions.push(move.actions)
            }
        })
        setActions(actions[0])
        setShowActions(true)
        setShowModal(true)
    }
    const viewMovements = (userFighterId) => {
        let newUser = user
        let moves = []
        newUser.fighters.forEach((fighter, index) => {
            if (fighter.userFighterId === userFighterId) {
                fighter.moves.forEach((move) => {
                    moves.push(move)
                })
            }
        })
        setMoves(moves)
        setShowMoves(true)
        setShowModal(true)
    }
    const setFirstFighter = (userFighterId) => {
        let newUser = { ...user }
        newUser.fighters.forEach((fighter) => {
            if (fighter.userFighterId === userFighterId) {
                fighter.active = true
            } else {
                fighter.active = false
            }
        })
        fetch("https://multiverse-battleground-default-rtdb.firebaseio.com/users/" + activeUser + ".json", {
            method: 'PATCH', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        }).then(() => updateUser())
    }
    const deleteFighter = (userFighterId) => {
        let newFighters = user.fighters.filter((fighter) => {
            return fighter.userFighterId != userFighterId
        })
        let newUser = user
        newUser.fighters = newFighters

        fetch("https://multiverse-battleground-default-rtdb.firebaseio.com/users/" + activeUser + ".json", {
            method: 'PATCH', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        }).then(() => updateUser())
    }
    return (<div className={`${classes.body} ${classes.backgroundImg}`}>
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
        <div className={classes.container} >
            <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
            {user &&
                user.fighters.map((fighter, i) => {
                    return (<div className={classes.fighterContainer}>
                        <FighterCard fighter={fighter}></FighterCard>
                        <Button onClick={() => { setFirstFighter(fighter.userFighterId) }} value="First in battle"></Button>
                        <Button onClick={() => { viewMovements(fighter.userFighterId) }} value="View movements"></Button>
                        {fighter.inParty ?
                            <Button onClick={() => { removeFromParty(fighter.userFighterId) }} value="Remove from party"></Button>
                            :
                            <Button onClick={() => { addToParty(fighter.userFighterId) }} value="Add to party"></Button>
                        }
                        <Button onClick={() => { deleteFighter(fighter.userFighterId) }} value="Sell Fighter"></Button>
                    </div>
                    );
                })}
        </div>
        {showModal && <Modal onClose={closeModal} color="white">
            {showMoves && moves && !showActions && <ul>{moves.map((move) => {
                return <li key={move.name} onClick={() => { viewActions(move.name) }}>
                    {move.name}
                </li>
            })} </ul>}
            {showActions && actions &&
                actions.map((action) => {
                    return <div key={Math.random()} >
                        <p>Inflicted on: {action.inflictedOn}</p>
                        <p>Field: {action.field}</p>
                        <p>Value: {action.value}</p>
                    </div>
                })
            }
            {!showMoves && < h1 > No se puede bro.. máximo 4</h1>}
        </Modal>}
    </div >
    );

}

export default FightersPage