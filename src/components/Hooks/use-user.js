import { useState, useEffect, useContext } from "react"
import { MyContext } from '../../context/MyContext';
const useUser = (origin) => {
    const [userFighter, setUserFighter] = useState()
    const [user, setUser] = useState()
    const [fightersLevels, setFightersLevels] = useState()
    const { userContext } = useContext(MyContext);
    let activeUser = userContext.idUsuario
    let backEndUrl = userContext.backEndUrl
    const reduceFighterMP = (attack) => {
        setUser((prevState) => {
            let newUser = { ...prevState }
            let newFighters = newUser.fighters.map((fighter) => {
                if (fighter.active === "true") {
                    fighter.moves.forEach((move, index) => {
                        if (move.moves.name === attack) {
                            move.currentMP -= 1
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
    const levelUpFighter = async (current_xp, newLevel, won, increaseFightsWon) => {
        if (user) {
            let newUser = { ...user }
            if (won) {
                let newFighter
                newUser.fighters.forEach(fighter => {
                    if (fighter.active === "true") {
                        fighter.current_xp = current_xp
                        fighter.level = newLevel
                        fightersLevels.forEach((level) => {
                            if (fighter.level === level.level && fighter.fighter_id === level.fighter_id) {
                                fighter.max_hp = level.max_hp
                                fighter.attack = level.attack
                                fighter.special_attack = level.special_attack
                                fighter.defense = level.defense
                                fighter.special_defense = level.special_defense
                                fighter.accuracy = level.accuracy
                            }
                        })
                        newFighter = fighter
                    }
                })
                increaseFightsWon()
                setUser(user)
                const parameters = [{
                    newFighter
                }]
                await fetch(backEndUrl + "/updatefighter", {
                    method: 'POST', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(parameters),
                })
                let moneyParameters = [{
                    user_id: activeUser,
                    quantity: 100
                }]
                await fetch(backEndUrl + "/updateusermoney", {
                    method: 'POST', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(moneyParameters),
                })
            }
        }
    };
    useEffect(() => {
        if (user && fightersLevels) {
            let newFighter = user.fighters.filter((fighter) => {
                return fighter.active === "true"
            })
            setUserFighter(newFighter[0])
        }
    }, [user, fightersLevels])
    const healUserFighter = ({ ...option }) => {
        let newOption = option
        setUser((prevState) => {
            let newUser = { ...prevState }
            newUser.fighters.forEach((fighter) => {
                if (fighter.active === "true") {
                    newOption.objects.actionobjects.forEach((action) => {
                        let result
                        if (action.field === "current_hp" && ((fighter.current_hp + action.value) > fighter.max_hp)) {
                            result = fighter.max_hp
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
            return newUser
        })
    }
    const attackUser = ({ ...attack }) => {
        let newValue = attack
        setUser((prevState) => {
            let newState = {
                ...prevState,
                fighters: prevState.fighters.map((fighter) => {
                    if (fighter.active === "true") {
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
            fetch(backEndUrl + '/alluserfighters/' + activeUser)
                .then(response => response.json())
                .then(data => {
                    let activeArray = []
                    if (origin === "enemy") {
                        fetch(backEndUrl + '/allfighters')
                            .then((response) => response.json())
                            .then((fightersData) => {
                                let randomValue = Math.floor(Math.random() * (fightersData.length))
                                for (let i = 0; i < fightersData.length; i++) {
                                    if (fightersData.length > 1) {
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
                                data.forEach((fighter) => {
                                    if (fighter.in_party === "true") {
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
                                    if (origin === "enemy") {
                                        fighter.active = activeArray[index]
                                    }
                                    fighter.current_hp = fighter.max_hp
                                    /* fighter.moves.forEach((move) => {
                                         move.currentMP = move.moves.mp
                                     })*/
                                    /* movesData.forEach((move) => {
                                         if (move.fighter_id === fighter.fighter_id) {
                                             fighter.moves = move
                                         }
                                     })*/
                                    return fighter
                                })
                                data.fighters = newFighters
                                setUser(data)


                            })
                    }
                    if (origin === "user") {
                        let newFighters = data.map((fighter, index) => {
                            fighter.moves.forEach((move) => {
                                move.currentMP = move.moves.mp
                            })
                            return fighter
                        })
                        data.fighters = newFighters
                        fetch(backEndUrl + '/alluserobjects/' + activeUser)
                            .then((response) => response.json())
                            .then((objects) => {
                                data.objects = objects
                                setUser(data)
                            })
                    }

                })
        }
    }, [fightersLevels, activeUser, origin,backEndUrl])
    useEffect(() => {
        fetch(backEndUrl + '/allfighterLevels')
            .then(response => response.json())
            .then(data => {
                setFightersLevels(data)
            })
    }, [backEndUrl])
    const changeUser = (user) => {
        setUser(user)
    }
    const changeUserFighter = (fighter) => {
        setUser((prevValue) => {
            let newValue = { ...prevValue }
            let newFighters = newValue.fighters
            newFighters.forEach((newFighter) => {
                if (newFighter.user_fighter_id !== fighter.user_fighter_id) {
                    newFighter.active = "false"
                } else {
                    newFighter.active = "true"
                }
            })
            newValue.fighters = newFighters
            return newValue
        })
    }
    return { user, changeUserFighter, userFighter, healUserFighter, attackUser, levelUpFighter, reduceFighterMP, changeUser }
}

export default useUser