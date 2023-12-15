import classes from './FightMenu.module.css'
import SubMenu from './SubMenu'
import { useState } from 'react'


const FightMenu = ({ user, userFighter, clickHandler, changeUserFighter }) => {
    const [subMenuActive, setSubMenuActive] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")
    const toggleSubMenu = (option) => {
        if (option === "run") {
            clickHandler("run")
        } else {
            setSelectedOption(option)
            setSubMenuActive(!subMenuActive)
        }
    }
    return (<div>
        {subMenuActive ? <SubMenu user={user} changeUserFighter={changeUserFighter} userFighter={userFighter} clickHandler={clickHandler} toggleSubMenu={toggleSubMenu} selectedOption={selectedOption}></SubMenu> :
            <div className={classes.fightMenu}>
                <div className={classes.fightMenuImg}>
                    <ul className={classes.optionsContainer}>
                        <li className={classes.options} onClick={() => toggleSubMenu("attacks")}>Attacks</li>
                        <li className={classes.options} onClick={() => toggleSubMenu("objects")}>Objects</li>
                        <li className={classes.options} onClick={() => toggleSubMenu("fighters")}>Fighter</li>
                        <li className={classes.options} onClick={() => toggleSubMenu("run")}>Run</li>
                    </ul>
                </div>
            </div >
        }</div>
    )
}

export default FightMenu