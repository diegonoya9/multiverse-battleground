import classes from './FightMenu.module.css'
import SubMenu from './SubMenu'
import { useState } from 'react'


const FightMenu = ({ user, userFighter, clickHandler, changeUserFighter, changeActivePage }) => {
    const [subMenuActive, setSubMenuActive] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")
    const toggleSubMenu = (option) => {
        setSelectedOption(option)
        setSubMenuActive(!subMenuActive)
    }
    return (
        <div className={classes.fightMenu}>
            {subMenuActive ? <SubMenu user={user} changeUserFighter={changeUserFighter} userFighter={userFighter} clickHandler={clickHandler} toggleSubMenu={toggleSubMenu} selectedOption={selectedOption}></SubMenu> :
                <ul className={classes.optionsContainer}>
                    <li className={classes.options} onClick={() => toggleSubMenu("attacks")}>Attacks</li>
                    <li className={classes.options} onClick={() => toggleSubMenu("objects")}>Objects</li>
                    <li className={classes.options} onClick={() => toggleSubMenu("fighters")}>Fighter</li>
                    <li className={classes.options} onClick={() => changeActivePage(1)}>Run</li>
                </ul>
            }
        </div >
    )
}

export default FightMenu