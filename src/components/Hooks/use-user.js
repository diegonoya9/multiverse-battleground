import { useState, useEffect, useContext } from "react"
import { MyContext } from '../../context/MyContext';
const useUser = (origin) => {
    const [userFighter, setUserFighter] = useState()
    const [user, setUser] = useState()
    const [fightersLevels, setFightersLevels] = useState()
    const { userContext } = useContext(MyContext);
    let activeUser = userContext.idUsuario
    const reduceFighterMP = (attack) => {
        setUser((prevState) => {
            let newUser = { ...prevState }
            let newFighters = newUser.fighters.map((fighter) => {
                if (fighter.active) {
                    fighter.moves.forEach((move, index) => {
                        if (move.name === attack) {
                            fighter.moves[index].currentMP -= 1
                        }
                    })
                }
                return fighter
            })
            return {
                ...prevState,
                fighters: newFighters
            };
        });
    }
    const levelUpFighter = (currentXP, newLevel, won) => {
        if (user) {
            let newUser = user
            if (won) {
                newUser.fighters.forEach(fighter => {
                    if (fighter.active) {
                        fighter.currentXP = currentXP
                        fighter.level = newLevel
                    }
                })
                newUser.objects.forEach((object) => {
                    if (object.name === "money") {
                        object.quantity += 100
                    }
                })
            }
            fetch("https://multiverse-battleground-default-rtdb.firebaseio.com/users/" + activeUser + ".json", {
                method: 'PATCH', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })

        }
    };
    useEffect(() => {
        if (user && fightersLevels) {
            let newFighter = user.fighters.filter((fighter) => {
                return fighter.active
            })
            setUserFighter(newFighter[0])
            //console.log(user)
        }
    }, [user, fightersLevels])
    const healUserFighter = ({ ...option }) => {
        let newOption = option
        // console.log(option)
        setUser((prevState) => {
            let newUser = { ...prevState }
            newUser.fighters.forEach((fighter) => {
                if (fighter.active) {
                    newOption.actions.forEach((action) => {
                        let result
                        if (action.field === "currentHP" && ((fighter.currentHP + action.value) > fighter.maxHP)) {
                            result = fighter.maxHP
                        } else {
                            result = Math.ceil(fighter[action.field] + action.value)
                        }
                        fighter[action.field] = result
                    })
                }
                return fighter
            })
            newUser.objects.forEach((object) => {
                if (object.name === newOption.name) {
                    object.quantity -= 1
                }
                return object
            })
            //console.log(newUser)
            return newUser
        })
    }
    const attackUser = ({ ...attack }) => {
        let newValue = attack
        setUser((prevState) => {
            let newState = {
                ...prevState,
                fighters: prevState.fighters.map((fighter) => {
                    if (fighter.active) {
                        if (newValue.field === "currentHP" && newValue.inflictedOn === "enemy") {
                            if (newValue.attackType === "normal") {
                                newValue.value = Math.round(Math.min(newValue.value + fighter.defense, newValue.value * 0.8))
                            } else {
                                newValue.value = Math.round(Math.min(newValue.value + fighter.specialDefense, newValue.value * 0.8))
                            }
                        }
                        if (newValue.field === "currentHP" && newValue.inflictedOn === "user") {
                            if (fighter[newValue.field] + newValue.value > fighter.maxHP) {
                                newValue.value = fighter.maxHP - fighter.currentHP
                            }
                        }
                        return {
                            ...fighter,
                            [newValue.field]: Math.max(0, fighter[newValue.field] + newValue.value),
                        };
                    }
                    return fighter;
                }),
            };
            return newState;
        });
    }
    useEffect(() => {
        if (fightersLevels) {
            fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/users/' + activeUser + '.json')
                .then(response => response.json())
                .then(data => {
                    let activeArray = []
                    if (origin === "enemy") {
                        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/fighters.json')
                            .then((response) => response.json())
                            .then((fightersData) => {
                                let randomValue = Math.floor(Math.random() * (fightersData.length))
                                for (let i = 0; i < fightersData.length; i++) {
                                    if (fightersData.length > 1) {
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
                                data.fighters.forEach((fighter) => {
                                    if (fighter.inParty) {
                                        totalFighters++
                                        totalLevel += fighter.level
                                    }
                                })
                                //let averageLevel = Math.round(Math.min((totalLevel / totalFighters) + (totalFighters * 1), 100))
                                let averageLevel = Math.min(Math.ceil(Math.max((totalLevel / totalFighters)), 100))
                                fightersData.forEach((fighter) => {
                                    fighter.level = averageLevel
                                })
                                data.fighters = fightersData
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
                                    if (origin === "enemy") {
                                        fighter.active = activeArray[index]
                                    }
                                    //fighter.currentHP = fighter.maxHP
                                    fighter.moves.forEach((move) => {
                                        move.currentMP = move.MP
                                    })
                                    return fighter
                                })
                                data.fighters = newFighters
                                setUser(data)
                            })
                    }
                    if (origin === "user") {
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
                            if (origin === "enemy") {
                                fighter.active = activeArray[index]
                            }
                            //fighter.currentHP = fighter.maxHP
                            fighter.moves.forEach((move) => {
                                move.currentMP = move.MP
                            })
                            return fighter
                        })
                        data.fighters = newFighters
                        setUser(data)
                    }

                })
        }
    }, [fightersLevels, activeUser, origin])
    useEffect(() => {
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/fightersLevels.json')
            .then(response => response.json())
            .then(data => {
                setFightersLevels(data)
            })
    }, [])

    const changeUserFighter = (fighter) => {
        setUser((prevValue) => {
            let newValue = { ...prevValue }
            let newFighters = newValue.fighters
            newFighters.forEach((newFighter) => {
                if (newFighter.userFighterId !== fighter.userFighterId) {
                    newFighter.active = false
                } else {
                    newFighter.active = true
                }
            })
            newValue.fighters = newFighters
            return newValue
        })
    }
    return { user, changeUserFighter, userFighter, healUserFighter, attackUser, levelUpFighter, reduceFighterMP }
}

export default useUser