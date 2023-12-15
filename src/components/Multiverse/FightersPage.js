import classes from "./FightersPage.module.css"
import ReactAudioPlayer from 'react-audio-player';
import Modal from "../UI/Modal";
import { useState, useContext } from "react";
import musicFile from "../../assets/sounds/music/DirtyLove.WAV"
import Button from "../UI/Button";
import { MyContext } from "../../context/MyContext";
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
        newUser.fighters.forEach((fighter, index) => {
            if (fighter.userFighterId === userFighterId) {
                fighter.inParty = false
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
        let newUser = user
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
    return (<div className={`${classes.body} ${classes.backgroundImg}`}>
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
        <div className={classes.container} >
            <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
            {user &&
                user.fighters.map((fighter) => {
                    return (
                        <div className={`${classes.fighterContainer} ${classes.card}`} key={fighter.id} >
                            <div className={` ${classes.imageContainer} ${classes.face} ${classes.front}  ${fighter.active && classes.active}`}>
                                <img alt="fighter" src={fighter.imgFront} className={classes.fighterImg} />
                                <h3 className={`${classes.fighterName} ${classes.title} `}>{fighter.name}</h3>
                            </div>
                            <div className={`${classes.divStats} ${classes.face} ${classes.back}  ${fighter.active && classes.active}`} key={`${fighter.id}stats`}>
                                <p className={classes.spanStats}>LEVEL:{fighter.level}</p>
                                <p className={classes.spanStats}>MAX HP:{fighter.maxHP}</p>
                                <p className={classes.spanStats}>CURRENT XP:{fighter.currentXP}</p>
                                <p className={classes.spanStats}>ATTACK:{fighter.attack}</p>
                                <p className={classes.spanStats}>SPECIAL ATTACK:{fighter.specialAttack}</p>
                                <p className={classes.spanStats}>DEFENSE:{fighter.defense}</p>
                                <p className={classes.spanStats}>SPECIAL DEFENSE:{fighter.specialDefense}</p>
                                <p className={classes.spanStats}>ACCURACY:{fighter.accuracy}</p>
                                {fighter.inParty ?
                                    <button type="submit" onClick={() => { removeFromParty(fighter.userFighterId) }}>Remove from party</button >
                                    :
                                    <button type="submit" onClick={() => { addToParty(fighter.userFighterId) }}>Add to party</button >
                                }
                                <button type="submit" onClick={() => { setFirstFighter(fighter.userFighterId) }}>First in battle</button>
                                <button type="submit" onClick={() => { viewMovements(fighter.userFighterId) }}>View movements</button>
                            </div>
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