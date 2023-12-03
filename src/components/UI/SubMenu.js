import classes from './SubMenu.module.css'
import { useState, useEffect } from 'react'
const SubMenu = ({ user, clickHandler, toggleSubMenu, selectedOption }) => {
    const [optionsArray, setOptionsArray] = useState()
    useEffect(() => {
        switch (selectedOption) {
            case "attacks":
                let fighter = user.fighters.filter((fighter) => {
                    if (fighter.active) {
                        return fighter
                    }
                })
                let moves = fighter[0].moves
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