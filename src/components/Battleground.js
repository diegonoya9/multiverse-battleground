import classes from './Battleground.module.css'
import Pokemon from './Pokemon'
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
        pokemons: [{
            name: "Dragonite",
            active: true,
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
    const [userPokemon, setUserPokemon] = useState()
    const [enemyPokemon, setEnemyPokemon] = useState()
    const handleSubMenuOption = (option, selectedOption) => {
        if (selectedOption === "attacks") {
            if (enemyPokemon && enemyPokemon.currentHP > 0) {
                const result = enemyPokemon.currentHP - option.damage;
                if (result <= 0) {
                    setEnemyPokemon((prevState) => {
                        let newState = { ...prevState }
                        newState.currentHP = 0
                        return newState
                    })
                } else {
                    setEnemyPokemon((prevState) => {
                        let newState = { ...prevState }
                        newState.currentHP = result
                        return newState
                    })
                }
                return result
            }
        }
        if (selectedOption === "objects") {
            setUserPokemon((prevState) => {
                let newPokemon = { ...prevState }
                newPokemon.currentHP += option.value
                return newPokemon
            })
            setUser((prevState) => {
                let newUser = { ...prevState }
                newUser.pokemons.forEach((pokemon) => {
                    if (pokemon.active) {
                        pokemon.currentHP += option.value
                    }
                    return pokemon
                })
                return newUser
            })
        }
    }
    useEffect(() => {
        setUserPokemon({
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
        setEnemyPokemon({
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
            {userPokemon && <Pokemon pokemon={userPokemon} user="user"></Pokemon>}
            {enemyPokemon && <Pokemon pokemon={enemyPokemon} user="enemy"></Pokemon>}
            <FightMenu user={user} enemyPokemon={enemyPokemon} clickHandler={handleSubMenuOption} ></FightMenu>
        </div>
    )
}

export default Battleground