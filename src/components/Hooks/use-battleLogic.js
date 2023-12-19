import { useState, useEffect } from "react";
import useUser from "./use-user";
import useBattleState from './use-battleState'

const useBattleLogic = (setShowLevelUp) => {
    const { battleEnded, endBattle, restartBattle } = useBattleState()
    const [showModal, setShowModal] = useState(false)
    const [userAttacked, setUserAttacked] = useState({ "active": false, "Sfx": '' })
    const [modalContent, setModalContent] = useState()
    const [fightersLevels, setFightersLevels] = useState()
    const [fightsWon, setFightsWon] = useState(0)
    const [turn, setTurn] = useState("user")
    const [nextTurn, setNextTurn] = useState()
    const { user, changeUserFighter, userFighter, healUserFighter, attackUser, levelUpFighter, reduceFighterMP } = useUser("user")
    const { user: enemy, changeUser: changeEnemyUser, userFighter: enemyFighter, changeUserFighter: changeEnemyFighter, attackUser: attackEnemy } = useUser("enemy")
    const [attack, setAttack] = useState({ active: false, src: "./assets/img/fire.png", inflictedOn: "enemy" })
    const increaseFightsWon = () => {
        setFightsWon((...prevValue) => {
            let newValue = prevValue
            newValue++
            return newValue
        })
    }
    const onCloseModal = () => {
        setShowModal(false)
        setTurn(nextTurn)
    }
    const changeShowModal = () => {
        setShowModal(false)
        setModalContent()
    }
    const handleModalState = (modalContent, nexTurn) => {
        if (modalContent) {
            setModalContent(modalContent)
            setShowModal(true)
            setNextTurn(nexTurn)
        }
    }
    const startNewFight = () => {
        setShowModal(false)
        let activeArray = []
        let data = { ...enemy }
        setFightsWon((prevValue) => {
            return prevValue++
        })
        setAttack((prevState) => {
            let newState = { ...prevState }
            newState.active = false
            return newState
        })
        setTurn("user")
        let randomValue = Math.floor(Math.random() * (data.fighters.length))
        for (let i = 0; i < data.fighters.length; i++) {
            if (data.fighters.length > 1) {
                if (i === randomValue) {
                    activeArray.push(true)
                } else {
                    activeArray.push(false)
                }
            } else {
                activeArray.push(true)
            }
        }
        let totalLevel = 0
        let totalFighters = 0
        user.fighters.forEach((fighter) => {
            if (fighter.inParty) {
                totalFighters++
                totalLevel += fighter.level
            }
        })
        //let averageLevel = Math.round(Math.min((totalLevel / totalFighters) + (totalFighters * 1), 100))
        let averageLevel = Math.min(Math.ceil(Math.max((totalLevel / totalFighters)), 100))
        data.fighters.forEach((fighter) => {
            fighter.level = averageLevel
        })
        let newFighters = data.fighters.map((fighter, index) => {
            fightersLevels.forEach((fighterLevel) => {
                if (fighterLevel.fighterId === fighter.fighterId && fighterLevel.level === fighter.level) {
                    fighter = {
                        ...fighter,
                        attack: fighterLevel.attack,
                        specialAttack: fighterLevel.specialAttack,
                        specialDefense: fighterLevel.specialDefense,
                        defense: fighterLevel.defense,
                        maxHP: fighterLevel.maxHp,
                        currentHP: fighterLevel.maxHp,
                        accuracy: fighterLevel.accuracy
                    }
                }
            })
            fighter.active = activeArray[index]
            fighter.currentHP = fighter.maxHP
            fighter.moves.forEach((move) => {
                move.currentMP = move.MP
            })
            return fighter
        })
        data.fighters = newFighters
        changeEnemyUser(data)
        restartBattle()
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
                            setUserAttacked({ "active": false, "Sfx": '' })
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
                                setUserAttacked({ "active": "user", "Sfx": option.Sfx })
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
                                setUserAttacked({ "active": "userPowerUp", "Sfx": option.Sfx })
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
                    setUserAttacked({ "active": false, "Sfx": '' })
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
                        setUserAttacked({ "active": "enemy", "Sfx": enemyFighter.moves[randomMove].Sfx })
                        if (action.attackType === "normal") {
                            newAction.value -= enemyFighter.attack
                        } else {
                            newAction.value -= enemyFighter.specialAttack
                        }
                        attackUser(newAction)
                    } else {
                        setUserAttacked({ "active": "enemyPowerUp", "Sfx": enemyFighter.moves[randomMove].Sfx })
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
            let newCurrentXP = userFighter.currentXP + (enemyFighter.level * 100) + (100 * fightsWon)
            let newLevel = userFighter.level
            fightersLevels.forEach((fighterLevel) => {
                if (fighterLevel.fighterId === userFighter.fighterId && fighterLevel.level > userFighter.level && fighterLevel.minXp < newCurrentXP) {
                    newLevel = fighterLevel.level
                    setShowLevelUp(true)
                }
            })
            levelUpFighter(newCurrentXP, newLevel, battleEnded.winner === "user", increaseFightsWon)
        }
        if (battleEnded.finished && battleEnded.winner !== "user" && userFighter) {
            levelUpFighter(userFighter.currentXP, userFighter.level, battleEnded.winner === "user", increaseFightsWon)
        }
    }, [battleEnded, userFighter])
    useEffect(() => {
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/fightersLevels.json')
            .then(response => response.json())
            .then(data => {
                setFightersLevels(data)
            })
    }, [])
    return { turn, userAttacked, setTurn, enemyAI, userLogic, attack, user, userFighter, enemyFighter, changeUserFighter, changeEnemyFighter, battleEnded, endBattle, showModal, onCloseModal, modalContent, changeShowModal, startNewFight }
}

export default useBattleLogic