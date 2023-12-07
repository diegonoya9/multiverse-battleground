import classes from './Battleground.module.css'
import Fighter from './Fighter'
import FightMenu from '../UI/FightMenu'
import { useEffect, useState } from 'react'
import useUser from '../Hooks/use-user'
import useBattleState from '../Hooks/use-battleState'
import useEnemy from '../Hooks/use-enemy'

const Battleground = () => {
    const [turn, setTurn] = useState("user")
    const [battleEnded, setBattleEnded, endBattle] = useBattleState()
    const [attack, setAttack] = useState({ active: false, src: "./assets/img/fire.png" })
    const [menuActive, setMenuActive] = useState(true)
    const [user, changeUserFighter, userFighter, restartPlayerFightersHP, healUserFighter, damageUserFighter] = useUser()
    const [enemyFighter, damageEnemy, restartEnemyFighter] = useEnemy()
    const handleSubMenuOption = (option, selectedOption) => {
        if (turn === "user") {
            if (selectedOption === "attacks") {
                if (enemyFighter && enemyFighter.currentHP > 0) {
                    setMenuActive(false)
                    setAttack((prevState) => {
                        let newState = { ...prevState }
                        newState.active = true
                        return newState
                    })
                    let result = enemyFighter.currentHP - option.damage;
                    damageEnemy(result)
                    if (result <= 0) {
                        endBattle('user', true)
                    }
                    const wait = () => {
                        setTimeout(() => {
                            setTurn("enemy")
                            //setTurn("user")
                            // Aquí puedes colocar la acción que quieres ejecutar después de 3 segundos
                        }, 3000); // 3000 milisegundos = 3 segundos
                    };
                    if (result !== 0) {
                        wait()
                    } else {
                        setMenuActive(true)
                    }

                }
            }
            if (selectedOption === "objects") {
                healUserFighter(option.value)
                setTurn("enemy")
            }

        }
    }
    useEffect(() => {
        if (turn === "enemy" && !battleEnded.finished) {
            setAttack((prevState) => {
                let newState = { ...prevState }
                newState.active = true
                return newState
            })
            let randomMove = Math.floor(Math.random() * 4)
            let damage = enemyFighter.moves[randomMove].damage
            let result = userFighter.currentHP - damage;
            if (result <= 0) {
                result = 0
                endBattle('enemy', true)
            }
            damageUserFighter(damage)
            const wait = () => {
                setTimeout(() => {
                    setAttack((prevState) => {
                        let newState = { ...prevState }
                        newState.active = false
                        return newState
                    })
                    setMenuActive(true)
                    setTurn("user")
                    // Aquí puedes colocar la acción que quieres ejecutar después de 3 segundos
                }, 100); // 3000 milisegundos = 3 segundos
            };
            if (result !== 0) {
                // Llama a la función para empezar a esperar
                wait();
            } else {
                setTurn('user')
            }
        }
        setMenuActive(true)
        setTurn('user')
    }, [turn])
    const restartGame = () => {
        restartPlayerFightersHP()
        restartEnemyFighter()
        endBattle(null, false)
    }
    return (
        <div className={classes.battleground}>
            {attack.active && turn === "user" && <img className={classes["attack-animation"]} src={attack.src} />}
            {attack.active && turn === "enemy" && <img className={classes["enemy-attack-animation"]} src={attack.src} />}
            {battleEnded.finished && <div>
                <h1>{battleEnded.winner} WON</h1>
                <input type="button" onClick={() => restartGame()} value="Fight again" />
            </div>}
            {userFighter && !battleEnded.finished && <Fighter fighter={userFighter} user="user"></Fighter>}
            {enemyFighter && !battleEnded.finished && <Fighter fighter={enemyFighter} user="enemy"></Fighter>}
            {!battleEnded.finished && menuActive && <FightMenu user={user} changeUserFighter={changeUserFighter} userFighter={userFighter} enemyFighter={enemyFighter} clickHandler={handleSubMenuOption} ></FightMenu>}

        </div>
    )
}

export default Battleground