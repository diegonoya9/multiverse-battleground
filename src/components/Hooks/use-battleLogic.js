import { useState } from "react";
import useUser from "./use-user";
const useBattleLogic = () => {
    const [turn, setTurn] = useState("user")
    const { user, changeUserFighter, userFighter, restartUserFightersHP, healUserFighter, attackUser, levelUpFighter } = useUser("user")
    const { userFighter: enemyFighter, restartUserFightersHP: restartEnemyFighter, attackUser: attackEnemy } = useUser("enemy")
    const [attack, setAttack] = useState({ active: false, src: "./assets/img/fire.png", inflictedOn: "enemy" })
    const userLogic = (option, selectedOption, setMenuActive) => {
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
                    option.actions.forEach((action) => {
                        if (action.inflictedOn === "enemy") {
                            setAttack((prevState) => {
                                let newState = { ...prevState }
                                newState.active = true
                                newState.inflictedOn = "enemy"
                                newState.src = "./assets/img/fire.png"
                                return newState
                            })
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
                healUserFighter(option.value)
                setTurn("enemy")
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
    return { turn, setTurn, enemyAI, userLogic, attack, restartUserFightersHP, restartEnemyFighter, user, userFighter, enemyFighter, changeUserFighter, levelUpFighter }
}

export default useBattleLogic