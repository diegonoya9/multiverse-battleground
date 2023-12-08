import classes from './Battleground.module.css'
import Fighter from './Fighter'
import FightMenu from '../UI/FightMenu'
import { useEffect, useState } from 'react'
import useUser from '../Hooks/use-user'
import useBattleState from '../Hooks/use-battleState'
import fightersLevelsModel from '../../model/fightersLevelsModel.js'

const Battleground = ({ changeActivePage }) => {
    const [turn, setTurn] = useState("user")
    const [fightersLevels] = useState(fightersLevelsModel)
    const { battleEnded, endBattle } = useBattleState()
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [attack, setAttack] = useState({ active: false, src: "./assets/img/fire.png" })
    const [menuActive, setMenuActive] = useState(true)
    const { user, changeUserFighter, userFighter, restartUserFightersHP, healUserFighter, attackUser, levelUpFighter } = useUser()
    const { userFighter: enemyFighter, restartUserFightersHP: restartEnemyFighter, attackUser: attackEnemy } = useUser()
    const handleSubMenuOption = (option, selectedOption) => {
        if (turn === "user") {
            if (selectedOption === "attacks") {
                if (enemyFighter && enemyFighter.currentHP > 0) {
                    const wait = () => {
                        setTimeout(() => {
                            setAttack((prevState) => {
                                let newState = { ...prevState }
                                newState.active = false
                                return newState
                            })
                            setTurn("enemy")
                        }, 3000); // 3000 milisegundos = 3 segundos
                    };
                    setMenuActive(false)
                    setAttack((prevState) => {
                        let newState = { ...prevState }
                        newState.active = true
                        return newState
                    })
                    option.actions.forEach((action) => {
                        if (action.inflictedOn === "enemy") {
                            attackEnemy(action)
                        } else {
                            attackUser(action)
                        }
                    })
                    wait()
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
            const wait = () => {
                setTimeout(() => {
                    setMenuActive(true)
                    setAttack((prevState) => {
                        let newState = { ...prevState }
                        newState.active = false
                        return newState
                    })
                    setTurn("user")
                    // Aquí puedes colocar la acción que quieres ejecutar después de 3 segundos
                }, 1000); // 3000 milisegundos = 3 segundos
            };
            let randomMove = Math.floor(Math.random() * 4)
            setAttack((prevState) => {
                let newState = { ...prevState }
                newState.active = true
                return newState
            })
            enemyFighter.moves[randomMove].actions.forEach((action) => {
                if (action.inflictedOn === "enemy") {
                    attackUser(action)
                } else {
                    attackEnemy(action)
                }
            })
            wait();
        }
    }, [turn])
    useEffect(() => {
        if (enemyFighter && enemyFighter.currentHP === 0) {
            endBattle("user", true)
        }
        if (userFighter && userFighter.currentHP === 0) {
            endBattle("enemy", true)
        }
    }, [userFighter, enemyFighter])
    useEffect(() => {
        if (battleEnded.finished && battleEnded.winner === "user" && userFighter) {
            let newCurrentXP = userFighter.currentXP + 100
            fightersLevels.forEach((figtherLevel) => {
                if (figtherLevel.fighterId === userFighter.fighterId && figtherLevel.level > userFighter.level && figtherLevel.minXp < newCurrentXP) {
                    console.log("newCurrentXP" + newCurrentXP)
                    levelUpFighter(newCurrentXP)
                    setShowLevelUp(true)
                }
            })
        }
    }, [battleEnded, userFighter])
    const restartGame = () => {
        endBattle(null, false)
        setShowLevelUp(false)
        setTurn("user")
        setMenuActive(true)
        restartUserFightersHP()
        restartEnemyFighter()
    }
    return (
        <div className={classes.battleground}>
            {showLevelUp && <h1>Tu luchador subió de nivel</h1>}
            {attack.active && turn === "user" && <img alt="userAttack" className={classes["attack-animation"]} src={attack.src} />}
            {attack.active && turn === "enemy" && <img alt="enemyAttack" className={classes["enemy-attack-animation"]} src={attack.src} />}
            {battleEnded.finished && <div>
                <h1>{battleEnded.winner} WON</h1>
                <input type="button" onClick={() => restartGame()} value="Fight again" />
            </div>}
            {userFighter && !battleEnded.finished && <Fighter fighter={userFighter} user="user"></Fighter>}
            {enemyFighter && !battleEnded.finished && <Fighter fighter={enemyFighter} user="enemy"></Fighter>}
            {!battleEnded.finished && menuActive && <FightMenu user={user} changeUserFighter={changeUserFighter} userFighter={userFighter} enemyFighter={enemyFighter} clickHandler={handleSubMenuOption} changeActivePage={changeActivePage} ></FightMenu>}

        </div>
    )
}

export default Battleground