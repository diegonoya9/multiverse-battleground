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
                            fighter.moves[index].MP -= 1
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
    const levelUpFighter = (currentXP) => {
        setUser((prevState) => {
            return {
                ...prevState,
                fighters: prevState.fighters.map((fighter) => {
                    if (fighter.active) {
                        return {
                            ...fighter,
                            level: fighter.level + 1,
                            currentXP,
                        };
                    }
                    return fighter;
                }),
            };
        });
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
            let newState = {
                ...prevState,
                fighters: prevState.fighters.map((fighter) => {
                    if (fighter.active) {
                        return {
                            ...fighter,
                            [attack.field]: Math.max(0, fighter[attack.field] + attack.value),
                        };
                    }
                    return fighter;
                }),
            };
            return newState;
        });
    }
    useEffect(() => {
        fetch('https://react-http-d74bc-default-rtdb.firebaseio.com/user.json')
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