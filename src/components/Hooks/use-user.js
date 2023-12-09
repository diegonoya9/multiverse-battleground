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
    const levelUpFighter = (currentXP, newLevel) => {
        if (user) {
            let newUser = user
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
    const healUserFighter = (value) => {
        setUser((prevState) => {
            let newUser = { ...prevState }
            newUser.fighters.forEach((fighter) => {
                if (fighter.active) {
                    const cure = fighter.currentHP += value
                    if (cure && cure <= fighter.maxHP) {

                        fighter.currentHP += value
                    }
                    fighter.currentHP = fighter.maxHP
                }
                return fighter
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
                            console.log(newValue)
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
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/user.json')
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