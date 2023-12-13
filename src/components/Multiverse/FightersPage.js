import classes from "./FightersPage.module.css"
import { useState } from "react";
const FightersPage = ({ user, changeMultiverseActivePage }) => {
    const [fighterParty, setFighterParty] = useState('b')
    const setParty = (userFighterId) => {
        let newUser = user
        let cant = 0
        let showModal = false
        newUser.fighters.forEach((fighter, index) => {
            if (fighter.inParty) {
                cant++
            }
            if (cant === 4) {
                showModal = true
            }
        })
        if (showModal) {
            console.log('no se puede bro')
        } else {
            newUser.fighters.forEach((fighter, index) => {
                if (fighter.userFighterId === userFighterId) {
                    fighter.inParty = true
                }
            })
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
    }

    return (<div>


        <button className={classes.backToMainMenuBtn} value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }} >Back to Main Menu </button>
        <div className={classes.container} >
            {user &&
                user.fighters.map((fighter) => {
                    return (
                        <div className={classes.fighterContainer} key={fighter.id}>
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
                                <button type="submit" onClick={() => { setParty(fighter.userFighterId) }}>Agregar a la partida</button >
                                <button type="submit" onClick={() => { console.log(fighter.active) }}>Primer turno</button>
                            </div>
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default FightersPage