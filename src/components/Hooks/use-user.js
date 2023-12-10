import { useState, useEffect } from "react"

const useUser = (origin) => {
    const [userFighter, setUserFighter] = useState()
    const [user, setUser] = useState()
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
            fetch("https://multiverse-battleground-default-rtdb.firebaseio.com/user.json", {
                method: 'PATCH', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })

        }
    };
    useEffect(() => {
        setUserFighter(() => {
            let newFighter = {}
            if (user) {
                newFighter = user.fighters.filter((fighter) => {
                    return fighter.active
                })
                return newFighter[0]
            }
        })
    }, [user])
    const healUserFighter = (option) => {
        setUser((prevState) => {
            let newUser = { ...prevState }
            newUser.fighters.forEach((fighter) => {
                if (fighter.active) {
                    option.actions.forEach((action) => {
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
                if (object.name === option.name) {
                    object.quantity -= 1
                }
                return object
            })
            return newUser
        })
    }
    const attackUser = (attack) => {
        setUser((prevState) => {
            let newValue = attack
            let newState = {
                ...prevState,
                fighters: prevState.fighters.map((fighter) => {
                    if (fighter.active) {
                        if (attack.field === "currentHP") {
                            if (attack.attackType === "normal") {
                                newValue.value = Math.min(attack.value + (0.5 * fighter.defense), attack.value * 0.5)
                            } else {
                                newValue.value = Math.min(attack.value + (0.5 * fighter.specialDefense), attack.value * 0.5)
                            }
                        }
                        return {
                            ...fighter,
                            [attack.field]: Math.max(0, fighter[attack.field] + newValue.value),
                        };
                    }
                    return fighter;
                }),
            };
            return newState;
        });
    }
    useEffect(() => {
        let activeUser
        if (process.env.NODE_ENV === 'production') {
            // Código específico para el entorno de desarrollo
            activeUser = 2
        } else if (process.env.NODE_ENV === 'development') {
            // Código específico para el entorno de producción
            activeUser = 1
        }
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/users/' + activeUser + '.json')
            .then(response => response.json())
            .then(data => {
                let activeArray = []
                if (origin === "user") {
                    activeArray = [true, false, false, false]
                }
                if (origin === "enemy") {
                    let randomValue = Math.round(Math.random() * 3)
                    for (let i = 0; i < 4; i++) {
                        if (i === randomValue) {
                            activeArray.push(true)
                        } else {
                            activeArray.push(false)
                        }
                    }
                }
                data.fighters.forEach((fighter, index) => {
                    fighter.active = activeArray[index]
                    fighter.currentHP = fighter.maxHP
                    fighter.moves.forEach((move) => {
                        move.currentMP = move.MP
                    })
                })
                setUser(data)
            })
    }, [])

    const changeUserFighter = (fighter) => {
        setUserFighter(fighter)
    }
    return { user, changeUserFighter, userFighter, healUserFighter, attackUser, levelUpFighter, reduceFighterMP }
}

export default useUser