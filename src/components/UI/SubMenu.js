import classes from './SubMenu.module.css'
import { useState, useEffect } from 'react'
const SubMenu = ({ user, clickHandler, toggleSubMenu, selectedOption }) => {
    const [optionsArray, setOptionsArray] = useState()
    useEffect(() => {
        switch (selectedOption) {
            case "attacks":
                let pokemon = user.pokemons.filter((pokemon) => {
                    if (pokemon.active) {
                        return pokemon
                    }
                })
                let moves = pokemon[0].moves
                setOptionsArray(moves)
                break
            case "objects":
                setOptionsArray(user.objects)
                break
        }
    }, [selectedOption])

    return (
        <ul className={classes.movesContainer} >
            {optionsArray && selectedOption === "attacks" && optionsArray.map((x, i) => { return <li key={x.name + i} className={classes.moves} onClick={() => { toggleSubMenu(); clickHandler(x, selectedOption); }}>{x.name}</li> })}
            {optionsArray && selectedOption === "objects" && optionsArray.map((x, i) => {
                return <li key={x.name + i} className={classes.moves} onClick={() => { toggleSubMenu(); clickHandler(x, selectedOption); }}>{x.name}</li>
            }
            )}
            <div className={classes.attack}></div>
        </ul>
    )
}
export default SubMenu