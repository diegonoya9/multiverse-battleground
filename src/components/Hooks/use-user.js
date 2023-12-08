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
            imgFront: './assets/img/charizard-front.png',
            imgBack: './assets/img/charizard-back.png',
            active: false,
            maxHP: 500,
            currentHP: 500,
            attack: 100,
            specialAttak: 150,
            defense: 50,
            specialDefense: 50,
            accuracy: 85,
            status: "nothing",
            currentXP: 200,
            level: 15,
            moves: [
                { name: "Quick Attack", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -50 }] },
                { name: "Punch", actions: [{ inflictedOn: "enemy", field: "currentHP", value: 100 }] },
                { name: "Def Up", actions: [{ inflictedOn: "user", field: "defense", value: 30 }] },
                { name: "Hiper Ray", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -50 }] }
            ]
        }, {
            name: "Goku",
            imgBack: './assets/img/goku.png',
            imgFront: './assets/img/goku-front.png',
            maxHP: 600,
            attack: 150,
            specialAttak: 250,
            defense: 100,
            specialDefense: 250,
            accuracy: 95,
            status: "nothing",
            active: false,
            currentHP: 600,
            currentXP: 200,
            level: 23,
            moves: [
                { name: "Kame Hame Ha", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -50 }] },
                { name: "Kaioken", actions: [{ inflictedOn: "user", field: "attack", value: 50 }] },
                { name: "Kaioken(X2)", actions: [{ inflictedOn: "user", field: "attack", value: 100 }] },
                { name: "Bite", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -500 }] }
            ]
        }, {
            name: "Mew",
            imgFront: './assets/img/mew-front.png',
            imgBack: './assets/img/mew-back.png',
            maxHP: 500,
            attack: 100,
            specialAttak: 350,
            defense: 50,
            specialDefense: 500,
            accuracy: 100,
            status: "nothing",
            active: true,
            currentHP: 500,
            currentXP: 200,
            level: 30,
            moves: [
                { name: "Quick Attack", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -150 }] },
                { name: "Sand Throw", actions: [{ inflictedOn: "enemy", field: "accuracy", value: -20 }, { inflictedOn: "enemy", field: "specialDefense", value: -20 }] },
                { name: "Def Up", actions: [{ inflictedOn: "user", field: "defense", value: 30 }] },
                { name: "Hiper Ray", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -250 }] }
            ]
        }]
    })
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