import { useState, useEffect, useContext } from "react";
import useUser from "./use-user";
import useBattleState from './use-battleState'
import { MyContext } from "../../context/MyContext";

const useBattleLogic = (setShowLevelUp) => {
    const { battleEnded, endBattle, restartBattle } = useBattleState()
    const { userContext, setCurrentLevel } = useContext(MyContext);
    const userName = userContext.userName
    const backEndUrl = userContext.backEndUrl
    const currentMission = userContext.currentMission
    const currentLevel = userContext.currentLevel
    const [showModal, setShowModal] = useState(false)
    const [userAttacked, setUserAttacked] = useState({ "active": false, "sfx": '' })
    const [inflictedActions, setInflictedActions] = useState([])
    const [modalContent, setModalContent] = useState()
    const [fightersLevels, setFightersLevels] = useState()
    const [fightsWon, setFightsWon] = useState(0)
    const [turn, setTurn] = useState("user")
    const [nextTurn, setNextTurn] = useState()
    const { user, changeUserFighter, userFighter, healUserFighter, attackUser, levelUpFighter, reduceFighterMP } = useUser("user")
    const { user: enemy, changeUser: changeEnemyUser, userFighter: enemyFighter, changeUserFighter: changeEnemyFighter, attackUser: attackEnemy } = useUser("enemy")
    const [attack, setAttack] = useState({ active: false, src: "./assets/img/fire.png", inflicted_on: "enemy" })
    const increaseFightsWon = () => {
        setFightsWon((...prevValue) => {
            let newValue = prevValue
            newValue++
            return newValue
        })
    }
    /*const [cure, setCure] = useState(0)*/
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
        if (currentMission === 0) {
            let randomValue = Math.floor(Math.random() * (data.fighters.length))
            for (let i = 0; i < data.fighters.length; i++) {
                if (data.fighters.length > 1) {
                    if (i === randomValue) {
                        activeArray.push("true")
                    } else {
                        activeArray.push("false")
                    }
                } else {
                    activeArray.push("true")
                }
            }
            let totalLevel = 0
            let totalFighters = 0
            user.fighters.forEach((fighter) => {
                if (fighter.in_party === "true") {
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
                    if (fighterLevel.fighter_id === fighter.fighter_id && fighterLevel.level === fighter.level) {
                        fighter = {
                            ...fighter,
                            attack: fighterLevel.attack,
                            special_attack: fighterLevel.special_attack,
                            special_defense: fighterLevel.special_defense,
                            defense: fighterLevel.defense,
                            max_hp: fighterLevel.max_hp,
                            current_hp: fighterLevel.max_hp,
                            accuracy: fighterLevel.accuracy
                        }
                    }
                })
                fighter.active = activeArray[index]
                fighter.current_hp = fighter.max_hp
                /* fighter.moves.forEach((move) => {
                     move.currentMP = move.MP
                 })*/
                return fighter
            })
            data.fighters = newFighters
            changeEnemyUser(data)
        } else {/* If it is a mission */
            let levelIndex = 0
            currentMission.missionlevels.forEach((level, index) => {
                if (level.order === currentLevel + 1) {
                    levelIndex = index
                }
            })
            let newFighters = data.fighters.map((fighter, index) => {
                fightersLevels.forEach((fighterLevel) => {
                    if (fighterLevel.fighter_id === fighter.fighter_id && fighterLevel.level === currentMission.missionlevels[levelIndex].level) {
                        fighter = {
                            ...fighter,
                            attack: fighterLevel.attack,
                            special_attack: fighterLevel.special_attack,
                            special_defense: fighterLevel.special_defense,
                            defense: fighterLevel.defense,
                            max_hp: fighterLevel.max_hp,
                            current_hp: fighterLevel.max_hp,
                            accuracy: fighterLevel.accuracy,
                            extra_attack: 0,
                            extra_special_attack: 0,
                            extra_defense: 0,
                            extra_special_defense: 0,
                            extra_accuracy: 0,
                            extra_max_hp: 0,
                            attack_multiplier: 0,
                            special_attack_multiplier: 0,
                            defense_multiplier: 0,
                            special_defense_multiplier: 0
                        }
                    }
                })
                fighter.level = currentMission.missionlevels[levelIndex].level
                if (fighter.fighter_id === currentMission.missionlevels[levelIndex].fighter_id) {
                    fighter.active = "true"
                } else {
                    fighter.active = "false"
                }
                fighter.current_hp = fighter.max_hp
                return fighter
            })
            let newUser = {}
            newUser.fighters = newFighters
            setCurrentLevel(currentLevel + 1)
            changeEnemyUser(newUser);
        }
        restartBattle()
    }
    const userLogic = (option, selectedOption, setMenuActive) => {
        if (turn === "user" && userFighter) {
            if (selectedOption === "attacks") {
                reduceFighterMP(option.name)
                if (enemyFighter && enemyFighter.current_hp > 0) {
                    let randomNumber = Math.random() * 100
                    let attackHit = (userFighter.accuracy + userFighter.extra_accuracy) >= randomNumber
                    let timeOut = 2000
                    if (!attackHit) {
                        timeOut = 1
                    }
                    const wait = (attackHit) => {
                        setTimeout(() => {
                            setInflictedActions([])
                            setAttack((prevState) => {
                                let newState = { ...prevState }
                                newState.active = false
                                return newState
                            })
                            setUserAttacked({ "active": false, "sfx": '' })
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
                        //console.log(option)
                        let newInflictedActions = []
                        option.actionmoves.forEach((action) => {
                            let newAction = { ...action }
                            if (action.inflicted_on === "enemy") {
                                setAttack((prevState) => {
                                    let newState = { ...prevState }
                                    newState.active = true
                                    newState.inflicted_on = "enemy"
                                    newState.src = option.img
                                    return newState
                                })
                                if (action.attack_type === "normal" && action.field === "current_hp") {
                                    //newAction.value -= 100000
                                    newAction.value -= userFighter.attack
                                    newAction.value -= userFighter.extra_attack     
                                    newAction.value = newAction.value * userFighter.attack_multiplier     
                                    newAction.value = Math.round(Math.min(newAction.value + enemyFighter.defense + enemyFighter.extra_defense, newAction.value - (newAction.value * 0.8)))
                                }
                                if (action.attack_type === "special" && action.field === "current_hp") {
                                    //newAction.value -= 100000
                                    newAction.value -= userFighter.special_attack
                                    newAction.value -= userFighter.extra_special_attack
                                    newAction.value = newAction.value * userFighter.special_attack_multiplier 
                                    newAction.value = Math.round(Math.min(newAction.value + enemyFighter.special_defense + enemyFighter.extra_special_defense, newAction.value - (newAction.value * 0.8)))
                                }
                                /* if (action.attack_type === "robavidas_special" && action.field === "current_hp") {
                                     //newAction.value -= 100000
                                     newAction.value -= userFighter.special_attack
                                     newAction.value -= userFighter.extra_special_attack
                                     newAction.value = Math.round(Math.min(newAction.value + enemyFighter.special_defense + enemyFighter.extra_special_defense, newAction.value - (newAction.value * 0.8)))
                                 }*/
                                setUserAttacked({ "active": "user", "sfx": option.sfx, 'totalDamage': newAction.value })
                                attackEnemy(newAction)
                                newInflictedActions.push(newAction)
                            } else {
                                setAttack((prevState) => {
                                    let newState = { ...prevState }
                                    newState.active = true
                                    newState.inflicted_on = "user"
                                    newState.src = option.img
                                    return newState
                                })
                                setUserAttacked({ "active": "userPowerUp", "sfx": option.sfx })
                                if (newAction.field === "current_hp" && newAction.inflicted_on === "user") {
                                    if ((userFighter.current_hp + ((newAction.value * userFighter.max_hp) / 100) > userFighter.max_hp)) {
                                        newAction.value = userFighter.max_hp - userFighter.current_hp
                                    } else {
                                        newAction.value = ((newAction.value * userFighter.max_hp) / 100)
                                    }
                                }
                                attackUser(newAction)
                                newInflictedActions.push(newAction)
                            }
                        })
                        setInflictedActions(newInflictedActions)
                    }
                    wait(attackHit)
                }
            }
            if (selectedOption === "objects") {
                setMenuActive(false)
                healUserFighter(option)
                if (option.name === 'Potion' || option.name === 'Super Potion') {
                    // setCure(option.objects.actionobjects[0].value)
                }
                handleModalState(`${userName} used ${option.name}`, "enemy")
            }
            if (option === "run") {
                endBattle("ran", true)
            }
        }
    }
    const enemyAI = (setMenuActive, battleEnded) => {
        if (turn === "enemy" && !battleEnded.finished && enemyFighter.current_hp > 0) {
            const randomMove = Math.floor(Math.random() * 4)
            let randomNumber = Math.random() * 100
            let attackHit = (enemyFighter.accuracy + enemyFighter.extra_accuracy) >= randomNumber
            let timeOut = 2000
            if (!attackHit) {
                timeOut = 1
            }
            const wait = (attackHit) => {
                setTimeout(() => {
                    setInflictedActions([])
                    setMenuActive(true)
                    setAttack((prevState) => {
                        let newState = { ...prevState }
                        newState.active = false
                        return newState
                    })
                    setUserAttacked({ "active": false, "sfx": '' })
                    if (attackHit) {
                        handleModalState(`Enemy ${enemyFighter.name} used ${enemyFighter.moves[randomMove].name}`, "user")
                    } else {
                        handleModalState(`Enemy ${enemyFighter.name} missed`, "user")
                    }
                    // Aquí puedes colocar la acción que quieres ejecutar después de 3 segundos
                }, timeOut); // 3000 milisegundos = 3 segundos
            };
            if (attackHit) {
                let newInflictedActions = []
                enemyFighter.moves[randomMove].actionmoves.forEach((action) => {
                    if (action.level === Math.max(parseInt(enemyFighter.level / 10), 1)) {
                        let newAction = { ...action }
                        if (action.inflicted_on === "enemy") {
                            setAttack((prevState) => {
                                let newState = { ...prevState }
                                newState.active = true
                                newState.inflicted_on = "user"
                                newState.src = enemyFighter.moves[randomMove].img
                                return newState
                            })
                            if (action.attackType === "normal" && action.field === "current_hp") {
                                newAction.value -= enemyFighter.attack
                                newAction.value -= enemyFighter.extra_attack
                                newAction.value = Math.round(Math.min(newAction.value + userFighter.defense + userFighter.extra_defense, newAction.value - (newAction.value * 0.8)))
                            }
                            if (action.attackType === "special" && action.field === "current_hp") {
                                newAction.value -= enemyFighter.special_attack
                                newAction.value -= enemyFighter.extra_special_attack
                                newAction.value = Math.round(Math.min(newAction.value + userFighter.special_defense + userFighter.extra_special_defense, newAction.value - (newAction.value * 0.8)))
                            }
                            attackUser(newAction)
                            newInflictedActions.push(newAction)
                            setUserAttacked({ "active": "enemy", "sfx": enemyFighter.moves[randomMove].sfx, 'totalDamage': newAction.value })
                        } else {
                            setUserAttacked({ "active": "enemyPowerUp", "sfx": enemyFighter.moves[randomMove].sfx })
                            setAttack((prevState) => {
                                let newState = { ...prevState }
                                newState.active = true
                                newState.inflicted_on = "enemy"
                                newState.src = enemyFighter.moves[randomMove].img
                                return newState
                            })
                            if (newAction.field === "current_hp" && newAction.inflicted_on === "user") {
                                if ((enemyFighter.current_hp + ((newAction.value * enemyFighter.max_hp) / 100) > enemyFighter.max_hp)) {
                                    newAction.value = enemyFighter.max_hp - enemyFighter.current_hp
                                } else {
                                    newAction.value = ((newAction.value * enemyFighter.max_hp) / 100)
                                }
                            }
                            attackEnemy(newAction)
                            newInflictedActions.push(newAction)
                        }
                    }
                })
                setInflictedActions(newInflictedActions)
            }
            wait(attackHit);
        }
    }
    useEffect(() => {
        if (battleEnded.finished && battleEnded.winner === "user" && enemyFighter.current_hp === 0 && userFighter && !attack.active) {
            let newCurrentXP = userFighter.current_xp + (enemyFighter.level * 100) + (100 * fightsWon)
            let newLevel = userFighter.level
            fightersLevels.forEach((fighterLevel) => {
                if (fighterLevel.fighter_id === userFighter.fighter_id && fighterLevel.level > userFighter.level && fighterLevel.min_xp < newCurrentXP) {
                    newLevel = fighterLevel.level
                    setShowLevelUp(true)
                }
            })
            const parameters = [{
                objects: user.objects
            }]
            fetch(backEndUrl + "/udpateuserobjectsbattle", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parameters),
            })
            //Hacer un POST de este result al apiControllers.upadateUserObjects
            levelUpFighter(newCurrentXP, newLevel, battleEnded.winner === "user", increaseFightsWon)
        }
        if (battleEnded.finished && battleEnded.winner !== "user" && userFighter) {
            const parameters = [{
                objects: user.objects
            }]
            fetch(backEndUrl + "/udpateuserobjectsbattle", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parameters),
            })
            levelUpFighter(userFighter.currentXP, userFighter.level, battleEnded.winner === "user", increaseFightsWon)
        }
    }, [battleEnded, userFighter])
    useEffect(() => {
        fetch(backEndUrl + '/allfighterLevels')
            .then(response => response.json())
            .then(data => {
                setFightersLevels(data)
            })
    }, [backEndUrl])
    return { turn, userAttacked, setTurn, enemyAI, userLogic, attack, user, userFighter, enemyFighter, changeUserFighter, changeEnemyFighter, battleEnded, endBattle, showModal, onCloseModal, modalContent, changeShowModal, startNewFight, healUserFighter, inflictedActions }
}

export default useBattleLogic