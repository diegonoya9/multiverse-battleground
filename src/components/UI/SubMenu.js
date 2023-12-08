import classes from './SubMenu.module.css'
import { useState, useEffect } from 'react'
const SubMenu = ({ user, clickHandler, toggleSubMenu, selectedOption, userFighter, changeUserFighter }) => {
    const [optionsArray, setOptionsArray] = useState()
    useEffect(() => {
        switch (selectedOption) {
            case "attacks":
                let moves = userFighter.moves
                setOptionsArray(moves)
                break
            case "objects":
                setOptionsArray(user.objects)
                break
            case "fighters":
                setOptionsArray(user.fighters)
                break
            default: break
        }
    }, [selectedOption])
    const changeFighter = (element) => {
        changeUserFighter((prevState) => {
            prevState.active = false;
            element.active = true;
            return (element)
        })
        userFighter = element
        return element
    }
    return (
        <ul className={classes.optionsContainer} >
            {optionsArray && selectedOption === "attacks" && optionsArray.map((x, i) => { return <li key={x.name + i} className={classes.options} onClick={() => { toggleSubMenu(); clickHandler(x, selectedOption); }}>{x.name}</li> })}
            {optionsArray && selectedOption === "objects" && optionsArray.map((x, i) => {
                return <li key={x.name + i} className={classes.options} onClick={() => { toggleSubMenu(); clickHandler(x, selectedOption); }}>{x.name}</li>
            }
            )}
            {optionsArray && selectedOption === "fighters" && optionsArray.map((x, i) => { return <li key={x.name + i} className={classes.options} onClick={() => { toggleSubMenu(); clickHandler(x, selectedOption); changeFighter(x); console.log(x.name, userFighter) }}>{x.name}</li> })}

            <div className={classes.attack}></div>
        </ul>
    )
}
export default SubMenu