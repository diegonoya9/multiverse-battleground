import { useState, useEffect } from "react"

const useUser = () => {
    const [userFighter, setUserFighter] = useState()
    const [user, setUser] = useState({
        name: "Red",
        objects: [
            {
                name: "potion",
                value: 50
            },
            {
                name: "maxPotion",
                value: 150
            }
        ],
        fighters: [{
            name: "Charizard",
            img: './assets/img/pokemon2.png',
            active: false,
            maxHP: 500,
            currentHP: 200,
            attack: 100,
            currentXP: 200,
            level: 15,
            moves: [
                { name: "Quick Attack", actions: [{ inflictedOn: "enemy", field: "currentHP", value: 50 }] },
                { name: "Punch", actions: [{ inflictedOn: "enemy", field: "currentHP", value: 100 }] },
                { name: "Def Up", actions: [{ inflictedOn: "user", field: "defense", value: 30 }] },
                { name: "Hiper Ray", actions: [{ inflictedOn: "enemy", field: "currentHP", value: 50 }] }
            ]
        }, {
            name: "Goku",
            img: './assets/img/goku.png',
            maxHP: 500,
            attack: 100,
            active: true,
            currentHP: 500,
            currentXP: 200,
            level: 15,
            moves: [
                { name: "Kame Hame Ha", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -50 }] },
                { name: "Kaioken", actions: [{ inflictedOn: "user", field: "attack", value: 50 }] },
                { name: "Kaioken(X2)", actions: [{ inflictedOn: "user", field: "attack", value: 100 }] },
                { name: "Bite", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -500 }] }
            ]
        }, {
            name: "Mew",
            img: './assets/img/pokemon.png',
            maxHP: 500,
            attack: 100,
            active: false,
            currentHP: 200,
            currentXP: 200,
            level: 15,
            moves: [
                { name: "Quick Attack", actions: [{ inflictedOn: "enemy", field: "currentHP", value: 50 }] },
                { name: "Punch", actions: [{ inflictedOn: "enemy", field: "currentHP", value: 100 }] },
                { name: "Def Up", actions: [{ inflictedOn: "user", field: "defense", value: 30 }] },
                { name: "Hiper Ray", actions: [{ inflictedOn: "enemy", field: "currentHP", value: 50 }] }
            ]
        }]
    })
    useEffect(() => {
        setUserFighter(() => {
            let newFighter = {}
            if (user) {
                newFighter = user.fighters.filter((fighter) => {
                    if (fighter.active) {
                        return fighter
                    }
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
                    fighter.currentHP += value
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
    return { user, changeUserFighter, userFighter, restartUserFightersHP, healUserFighter, attackUser }
}

export default useUser