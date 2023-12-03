import classes from './Battleground.module.css'
import Fighter from './Fighter'
import FightMenu from './UI/FightMenu'
import { useEffect, useState } from 'react'

const Battleground = () => {
    const [turn, setTurn] = useState("user")
    const [battleEnded, setBattleEnded] = useState({ finished: false, winner: null })
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
            name: "Dragonite",
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
            maxHP: 500,
            active: true,
            currentHP: 500,
            currentXP: 200,
            level: 15,
            moves: [
                { name: "Kame Hame Ha", damage: 50 },
                { name: "Punch", damage: 150 },
                { name: "Kick", damage: 40 },
                { name: "Bite", damage: 200 }
            ]
        }, {
            name: "Mew",
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
    const [userFighter, setUserFighter] = useState()
    const [enemyFighter, setEnemyFighter] = useState()
    const handleSubMenuOption = (option, selectedOption) => {
        if (turn === "user") {
            if (selectedOption === "attacks") {
                if (enemyFighter && enemyFighter.currentHP > 0) {
                    let result = enemyFighter.currentHP - option.damage;
                    if (result <= 0) {
                        setBattleEnded((prevState) => {
                            let newState = { ...prevState }
                            newState.finished = true
                            newState.winner = "user"
                            return newState
                        })
                        setEnemyFighter((prevState) => {
                            let newState = { ...prevState }
                            newState.currentHP = 0
                            return newState
                        })
                    } else {
                        setEnemyFighter((prevState) => {
                            let newState = { ...prevState }
                            newState.currentHP = result
                            return newState
                        })
                    }
                }
            }
            if (selectedOption === "objects") {
                setUserFighter((prevState) => {
                    let newFighter = { ...prevState }
                    newFighter.currentHP += option.value
                    return newFighter
                })
                setUser((prevState) => {
                    let newUser = { ...prevState }
                    newUser.fighters.forEach((fighter) => {
                        if (fighter.active) {
                            fighter.currentHP += option.value
                        }
                        return fighter
                    })
                    return newUser
                })
            }
            setTurn("enemy")
        }
    }
    useEffect(() => {
        if (turn === "enemy" && !battleEnded.finished) {
            let randomMove = Math.floor(Math.random() * 4)
            let damage = enemyFighter.moves[randomMove].damage
            if (userFighter && userFighter.currentHP > 0) {
                let result = userFighter.currentHP - damage;
                if (result <= 0) {
                    result = 0
                    setBattleEnded((prevState) => {
                        let newState = { ...prevState }
                        newState.finished = true
                        newState.winner = "enemy"
                        return newState
                    })
                }
                setUser((prevState) => {
                    let newState = { ...prevState }
                    newState.fighters.forEach((fighter) => {
                        if (fighter.active) {
                            fighter.currentHP = result
                        }
                    })
                    return newState
                })
                setUserFighter((prevState) => {
                    let newState = { ...prevState }
                    newState.currentHP = result
                    return newState
                })
            }
            setTurn("user")
        }
    }, [turn])
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
    useEffect(() => {
        setEnemyFighter({
            name: "Charizard",
            maxHP: 400,
            currentHP: 400,
            level: 13,
            currentXP: 500,
            moves: [
                { name: "Quick Attack", damage: 50 },
                { name: "Punch", damage: 150 },
                { name: "Thunderbolt", damage: 40 },
                { name: "Hiper Ray", damage: 200 }
            ]
        })
    }, [])
    const restartGame = () => {
        setBattleEnded({ finished: false, winner: null })
        /* Hago esto para que pueda seguir peleando, pero no va a ser la lógica final*/
        setUserFighter((prevState) => {
            let newFighter = { ...prevState }
            console.log(newFighter.maxHP)
            newFighter.currentHP = newFighter.maxHP
            return newFighter
        })
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
        setEnemyFighter({
            name: "Charizard",
            maxHP: 400,
            currentHP: 400,
            level: 13,
            currentXP: 500,
            moves: [
                { name: "Quick Attack", damage: 50 },
                { name: "Punch", damage: 150 },
                { name: "Thunderbolt", damage: 40 },
                { name: "Hiper Ray", damage: 200 }
            ]
        })
    }
    return (
        <div className={classes.battleground}>
            {battleEnded.finished && <div>
                <h1>{battleEnded.winner} WON</h1>
                <input type="button" onClick={() => restartGame()} value="Fight again" />
            </div>}
            {userFighter && !battleEnded.finished && <Fighter fighter={userFighter} user="user"></Fighter>}
            {enemyFighter && !battleEnded.finished && <Fighter fighter={enemyFighter} user="enemy"></Fighter>}
            {!battleEnded.finished && <FightMenu user={user} enemyFighter={enemyFighter} clickHandler={handleSubMenuOption} ></FightMenu>}

        </div>
    )
}

export default Battleground