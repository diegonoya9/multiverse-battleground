import { useState, useEffect } from "react";
import useUser from "./use-user";
import useBattleState from './use-battleState'
import fightersLevelsModel from '../../model/fightersLevelsModel.js'
const useBattleLogic = (setShowLevelUp) => {
    const { battleEnded, endBattle } = useBattleState()
    const [fightersLevels] = useState(fightersLevelsModel)
    const [turn, setTurn] = useState("user")
    const { user, changeUserFighter, userFighter, healUserFighter, attackUser, levelUpFighter, reduceFighterMP } = useUser("user")
    const { userFighter: enemyFighter, changeUser: changeEnemy, changeUserFighter: changeEnemyFighter, attackUser: attackEnemy } = useUser("enemy")
    const [attack, setAttack] = useState({ active: false, src: "./assets/img/fire.png", inflictedOn: "enemy" })
    const userLogic = (option, selectedOption, setMenuActive) => {
        if (turn === "user") {
            if (selectedOption === "attacks") {
                reduceFighterMP(option.name)
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
                    option.actions.forEach((action) => {
                        if (action.inflictedOn === "enemy") {
                            setAttack((prevState) => {
                                let newState = { ...prevState }
                                newState.active = true
                                newState.inflictedOn = "enemy"
                                newState.src = "./assets/img/fire.png"
                                return newState
                            })
                            if (action.attackType === "normal") {
                                action.value -= userFighter.attack
                            } else {
                                action.value -= userFighter.specialAttack
                            }
                            attackEnemy(action)
                        } else {
                            setAttack((prevState) => {
                                let newState = { ...prevState }
                                newState.active = true
                                newState.inflictedOn = "user"
                                newState.src = "./assets/img/aura.png"
                                return newState
                            })
                            attackUser(action)
                        }
                    })
                    wait()
                }
            }
            if (selectedOption === "objects") {
                healUserFighter(option)
                setTurn("enemy")
            }
            if (option === "run") {
                endBattle("ran", true)
            }
        }
    }
    const enemyAI = (setMenuActive, battleEnded) => {
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
            enemyFighter.moves[randomMove].actions.forEach((action) => {
                if (action.inflictedOn === "enemy") {
                    setAttack((prevState) => {
                        let newState = { ...prevState }
                        newState.active = true
                        newState.inflictedOn = "user"
                        newState.src = "./assets/img/fire.png"
                        return newState
                    })
                    attackUser(action)
                } else {
                    setAttack((prevState) => {
                        let newState = { ...prevState }
                        newState.active = true
                        newState.inflictedOn = "enemy"
                        newState.src = "./assets/img/aura.png"
                        return newState
                    })
                    attackEnemy(action)
                }
            })
            wait();
        }
    }
    useEffect(() => {
        if (battleEnded.finished && battleEnded.winner === "user" && userFighter) {
            let newCurrentXP = userFighter.currentXP + 100
            let newLevel = userFighter.level
            fightersLevels.forEach((fighterLevel) => {
                if (fighterLevel.fighterId === userFighter.fighterId && fighterLevel.level > userFighter.level && fighterLevel.minXp < newCurrentXP) {
                    newLevel = fighterLevel.level
                    setShowLevelUp(true)
                }
            })
            levelUpFighter(newCurrentXP, newLevel, battleEnded.winner === "user")
        }
        if (battleEnded.finished && battleEnded.winner !== "user" && userFighter) {
            levelUpFighter(userFighter.currentXP, userFighter.level, battleEnded.winner === "user")
        }
    }, [battleEnded, userFighter])
    return { turn, setTurn, enemyAI, userLogic, attack, user, userFighter, enemyFighter, changeUserFighter, changeEnemyFighter, battleEnded, endBattle }
}

export default useBattleLogic