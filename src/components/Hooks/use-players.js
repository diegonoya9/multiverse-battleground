import { useState, useEffect } from "react"

const usePlayers = () => {
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
            currentXP: 200,
            level: 15,
            moves: [
                { name: "Quick Attack", damage: 50 },
                { name: "Punch", damage: 150 },
                { name: "Thunderbolt", damage: 40 },
                { name: "Hiper Ray", damage: 200 }
            ]
        }, {
            name: "Goku",
            img: './assets/img/goku.png',
            maxHP: 500,
            active: true,
            currentHP: 500,
            currentXP: 200,
            level: 15,
            moves: [
                { name: "Kame Hame Ha", damage: 50 },
                { name: "Punch", damage: 150 },
                { name: "Kick", damage: 40 },
                { name: "Bite", damage: 400 }
            ]
        }, {
            name: "Mew",
            img: './assets/img/pokemon.png',
            maxHP: 500,
            active: false,
            currentHP: 200,
            currentXP: 200,
            level: 15,
            moves: [
                { name: "Quick Attack", damage: 50 },
                { name: "Punch", damage: 150 },
                { name: "Thunderbolt", damage: 40 },
                { name: "Hiper Ray", damage: 200 }
            ]
        }]
    })
    useEffect(() => {
        setUserFighter((prevState) => {
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
    const restartPlayerFightersHP = () => {
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
    const damageUserFighter = (result) => {
        setUserFighter((prevState) => {
            let newState = { ...prevState }
            newState.currentHP = result
            return newState
        })
    }
    const changeUserFighter = (fighter) => {
        setUserFighter(fighter)
    }


    return [user, setUser, changeUserFighter, userFighter, setUserFighter, restartPlayerFightersHP, healUserFighter, damageUserFighter]
}

export default usePlayers