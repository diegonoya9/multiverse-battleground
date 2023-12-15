import classes from './FightMenu.module.css'
import SubMenu from './SubMenu'
import { useState } from 'react'
import Button from '../UI/Button'


const FightMenu = ({ user, userFighter, clickHandler, changeUserFighter, styleType }) => {
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
        {subMenuActive ? <SubMenu styleType={styleType} user={user} changeUserFighter={changeUserFighter} userFighter={userFighter} clickHandler={clickHandler} toggleSubMenu={toggleSubMenu} selectedOption={selectedOption}></SubMenu> :
            <div className={classes.fightMenu}>
                <div className={`${classes.fightMenuImg} ${classes[styleType]}`}>
                    <ul className={classes.optionsContainer}>
                        <div className={classes.options}>
                            <Button styleType={styleType} completeWidth="true" onClick={() => toggleSubMenu("fighters")} value="Fighters" />
                        </div>
                        <div className={classes.options}>
                            <Button styleType={styleType} completeWidth="true" onClick={() => toggleSubMenu("run")} value="Run" />
                        </div>
                        <div className={classes.options}>
                            <Button styleType={styleType} completeWidth="true" onClick={() => toggleSubMenu("attacks")} value="Attacks" />
                        </div>
                        <div className={classes.options}>
                            <Button styleType={styleType} completeWidth="true" onClick={() => toggleSubMenu("objects")} value="Objects" />
                        </div>
                    </ul>
                </div>
            </div >
        }</div>
    )
}

export default FightMenu