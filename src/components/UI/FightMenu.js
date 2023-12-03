import classes from './FightMenu.module.css'
import SubMenu from './SubMenu'
import { useState } from 'react'


const FightMenu = ({ user, clickHandler }) => {
    const [subMenuActive, setSubMenuActive] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")
    const toggleSubMenu = (option) => {
        setSelectedOption(option)
        setSubMenuActive(!subMenuActive)
    }
    return (
        <div className={classes.fightMenu}>
            {subMenuActive ? <SubMenu user={user} clickHandler={clickHandler} toggleSubMenu={toggleSubMenu} selectedOption={selectedOption}></SubMenu> :
                <ul className={classes.optionsContainer}>
                    <li className={classes.options} onClick={() => toggleSubMenu("attacks")}>Attacks</li>
                    <li className={classes.options} onClick={() => toggleSubMenu("objects")}>Objects</li>
                    <li className={classes.options} onClick={() => toggleSubMenu("pokemon")}>Pokemon</li>
                    <li className={classes.options} onClick={() => toggleSubMenu("run")}>Run</li>
                </ul>
            }
        </div >
    )
}

export default FightMenu