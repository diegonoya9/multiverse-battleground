import { useState, useEffect } from "react";
import useUser from "./use-user";
import useBattleState from './use-battleState'

const useBattleLogic = (setShowLevelUp) => {
    const { battleEnded, endBattle } = useBattleState()
    const [showModal, setShowModal] = useState(false)
    const [userAttacked, setUserAttacked] = useState(false)
    const [modalContent, setModalContent] = useState()
    const [fightersLevels, setFightersLevels] = useState()
    const [turn, setTurn] = useState("user")
    const [nextTurn, setNextTurn] = useState()
    const { user, changeUserFighter, userFighter, healUserFighter, attackUser, levelUpFighter, reduceFighterMP } = useUser("user")
    const { userFighter: enemyFighter, changeUserFighter: changeEnemyFighter, attackUser: attackEnemy } = useUser("enemy")
    const [attack, setAttack] = useState({ active: false, src: "./assets/img/fire.png", inflictedOn: "enemy" })
    const onCloseModal = () => {
        setShowModal(false)
        setTurn(nextTurn)
    }
    const handleModalState = (modalContent, nexTurn) => {
        if (modalContent) {
            setModalContent(modalContent)
            setShowModal(true)
            setNextTurn(nexTurn)
        }
    }
    const userLogic = (option, selectedOption, setMenuActive) => {
        if (turn === "user") {
            if (selectedOption === "attacks") {
                reduceFighterMP(option.name)
                if (enemyFighter && enemyFighter.currentHP > 0) {
                    let randomNumber = Math.random() * 100
                    let attackHit = userFighter.accuracy >= randomNumber
                    let timeOut = 2000
                    if (!attackHit) {
                        timeOut = 1
                    }
                    const wait = (attackHit) => {
                        setTimeout(() => {
                            setAttack((prevState) => {
                                let newState = { ...prevState }
                                newState.active = false
                                return newState
                            })
                            setUserAttacked(false)
                            if (attackHit) {
                                handleModalState(`${userFighter.name} used ${option.name}`, "enemy")
                            } else {
                                handleModalState(`${userFighter.name} missed`, "enemy")
                            }
                            // setTurn("enemy")
                        }, timeOut); // 3000 milisegundos = 3 segundos
                    };

                    setMenuActive(false)
                    if (attackHit) {
                        option.actions.forEach((action) => {
                            let newAction = { ...action }
                            if (action.inflictedOn === "enemy") {
                                setAttack((prevState) => {
                                    let newState = { ...prevState }
                                    newState.active = true
                                    newState.inflictedOn = "enemy"
                                    newState.src = option.img
                                    return newState
                                })
                                setUserAttacked("user")
                                if (action.attackType === "normal") {
                                    newAction.value -= userFighter.attack
                                } else {
                                    newAction.value -= userFighter.specialAttack
                                }
                                attackEnemy(newAction)
                            } else {
                                setAttack((prevState) => {
                                    let newState = { ...prevState }
                                    newState.active = true
                                    newState.inflictedOn = "user"
                                    newState.src = option.img
                                    return newState
                                })
                                setUserAttacked("userPowerUp")
                                attackUser(newAction)
                            }
                        })
                    }
                    wait(attackHit)
                }
            }
            if (selectedOption === "objects") {
                setMenuActive(false)
                healUserFighter(option)
                handleModalState(`${user.name} used ${option.name}`, "enemy")
            }
            if (option === "run") {
                endBattle("ran", true)
            }
        }
    }
    const enemyAI = (setMenuActive, battleEnded) => {
        if (turn === "enemy" && !battleEnded.finished) {
            const randomMove = Math.floor(Math.random() * 4)
            let randomNumber = Math.random() * 100
            let attackHit = enemyFighter.accuracy >= randomNumber
            let timeOut = 2000
            if (!attackHit) {
                timeOut = 1
            }
            const wait = (attackHit) => {
                setTimeout(() => {
                    setMenuActive(true)
                    setAttack((prevState) => {
                        let newState = { ...prevState }
                        newState.active = false
                        return newState
                    })
                    setUserAttacked(false)
                    if (attackHit) {
                        handleModalState(`Enemy ${enemyFighter.name} used ${enemyFighter.moves[randomMove].name}`, "user")
                    } else {
                        handleModalState(`Enemy ${enemyFighter.name} missed`, "user")
                    }
                    // Aquí puedes colocar la acción que quieres ejecutar después de 3 segundos
                }, timeOut); // 3000 milisegundos = 3 segundos
            };

            if (attackHit) {
                enemyFighter.moves[randomMove].actions.forEach((action) => {
                    let newAction = { ...action }
                    if (action.inflictedOn === "enemy") {
                        setAttack((prevState) => {
                            let newState = { ...prevState }
                            newState.active = true
                            newState.inflictedOn = "user"
                            newState.src = enemyFighter.moves[randomMove].img
                            return newState
                        })
                        setUserAttacked("enemy")
                        if (action.attackType === "normal") {
                            newAction.value -= enemyFighter.attack
                        } else {
                            newAction.value -= enemyFighter.specialAttack
                        }
                        attackUser(newAction)
                    } else {
                        setUserAttacked("enemyPowerUp")
                        setAttack((prevState) => {
                            let newState = { ...prevState }
                            newState.active = true
                            newState.inflictedOn = "enemy"
                            newState.src = enemyFighter.moves[randomMove].img
                            return newState
                        })
                        attackEnemy(action)
                    }
                })
            }
            wait(attackHit);
        }
    }
    useEffect(() => {
        if (battleEnded.finished && battleEnded.winner === "user" && userFighter) {
            let newCurrentXP = userFighter.currentXP + (enemyFighter.level * 100)
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
    useEffect(() => {
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/fightersLevels.json')
            .then(response => response.json())
            .then(data => {
                setFightersLevels(data)
            })
    }, [])
    return { turn, userAttacked, setTurn, enemyAI, userLogic, attack, user, userFighter, enemyFighter, changeUserFighter, changeEnemyFighter, battleEnded, endBattle, showModal, onCloseModal, modalContent }
}

export default useBattleLogic