import { useState, useEffect } from "react"
import userModel from '../../model/userModel.js'

const useUser = () => {
    const [userFighter, setUserFighter] = useState()
    const [user, setUser] = useState(userModel)
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
    const restartUserFightersHP = () => {
        setUser((prevState) => {
            let newUser = { ...prevState }
            newUser.fighters.forEach((fighter) => {
                if (fighter.active) {
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


    const changeUserFighter = (fighter) => {
        setUserFighter(fighter)
    }
    return { user, changeUserFighter, userFighter, restartUserFightersHP, healUserFighter, attackUser, levelUpFighter }
}

export default useUser