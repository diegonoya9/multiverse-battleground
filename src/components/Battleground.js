import classes from './Battleground.module.css'
import Fighter from './Fighter'
import FightMenu from './UI/FightMenu'
import { useEffect, useState } from 'react'

const Battleground = () => {
    console.log('a')
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
            currentHP: 200,
            currentXP: 200,
            level: 15,
            moves: [
                { name: "Kame Hame Ha", damage: 50 },
                { name: "Punch", damage: 150 },
                { name: "Blast", damage: 40 },
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
        if (selectedOption === "attacks") {
            if (enemyFighter && enemyFighter.currentHP > 0) {
                const result = enemyFighter.currentHP - option.damage;
                if (result <= 0) {
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
                return result
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
    }
    useEffect(() => {
        setUserFighter({
            name: "Mew",
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
        })
        setEnemyFighter({
            name: "Charizard",
            maxHP: 400,
            currentHP: 350,
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
    return (
        <div className={classes.battleground}>
            {userFighter && <Fighter fighter={userFighter} user="user"></Fighter>}
            {enemyFighter && <Fighter fighter={enemyFighter} user="enemy"></Fighter>}
            <FightMenu user={user} enemyFighter={enemyFighter} clickHandler={handleSubMenuOption} ></FightMenu>
        </div>
    )
}

export default Battleground