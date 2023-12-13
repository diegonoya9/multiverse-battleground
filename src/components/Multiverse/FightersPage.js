import classes from "./FightersPage.module.css"
import ReactAudioPlayer from 'react-audio-player';
import Modal from "../UI/Modal";
import { useState, useContext } from "react";
import musicFile from "../../assets/sounds/music/DirtyLove.WAV"
import { MyContext } from "../../context/MyContext";
const FightersPage = ({ user, changeMultiverseActivePage, updateUser }) => {
    const [showModal, setShowModal] = useState(false)
    const { userContext } = useContext(MyContext);
    let activeUser = userContext.idUsuario
    const audioStyle = {
        display: 'none',
    };
    const closeModal = () => {
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
    const setFirstFighter = (userFighterId) => {
        let newUser = user
        newUser.fighters.forEach((fighter) => {
            if (fighter.userFighterId === userFighterId) {
                fighter.active = true
            } else {
                fighter.active = false
            }
        })
        console.log(newUser)
        fetch("https://multiverse-battleground-default-rtdb.firebaseio.com/users/" + activeUser + ".json", {
            method: 'PATCH', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        }).then(() => updateUser())
    }
    return (<div>



        <button key="backToMenu" className={classes.backToMainMenuBtn} value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }} >Back to Main Menu </button>
        <div className={classes.container} >
            <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
            {user &&
                user.fighters.map((fighter) => {
                    return (
                        <div className={`${classes.fighterContainer} ${fighter.active && classes.active}`} key={fighter.id} >
                            <span className={classes.fighterName}>{fighter.name}</span>
                            <div className={classes.imageContainer}>
                                <img alt="fighter" src={fighter.imgFront} className={classes.fighterImg} />
                            </div>
                            <div className={classes.divStats} key={`${fighter.id}stats`}>
                                <span className={classes.spanStats}>LEVEL:{fighter.level}</span>
                                <span className={classes.spanStats}>MAX HP:{fighter.maxHP}</span>
                                <span className={classes.spanStats}>CURRENT XP:{fighter.currentXP}</span>
                                <span className={classes.spanStats}>ATTACK:{fighter.attack}</span>
                                <span className={classes.spanStats}>SPECIAL ATTACK:{fighter.specialAttack}</span>
                                <span className={classes.spanStats}>DEFENSE:{fighter.defense}</span>
                                <span className={classes.spanStats}>SPECIAL DEFENSE:{fighter.specialDefense}</span>
                                <span className={classes.spanStats}>ACCURACY:{fighter.accuracy}</span>
                                {fighter.inParty ?
                                    <button type="submit" onClick={() => { removeFromParty(fighter.userFighterId) }}>Remove from party</button >
                                    :
                                    <button type="submit" onClick={() => { addToParty(fighter.userFighterId) }}>Add to party</button >
                                }
                                <button type="submit" onClick={() => { setFirstFighter(fighter.userFighterId) }}>First in battle</button>
                            </div>
                        </div>
                    );
                })}
        </div>
        {showModal && <Modal onClose={closeModal} color="white">
            <h1>No se puede bro.. máximo 4</h1></Modal>}
    </div>
    );

}

export default FightersPage