import classes from './FightMenu.module.css'
import SubMenu from './SubMenu'
import { useState } from 'react'
import Button from '../UI/Button'
import { useTranslation } from 'react-i18next';

const FightMenu = ({ user, userFighter, clickHandler, changeUserFighter, styleType }) => {
    const { t } = useTranslation();
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
        {subMenuActive ? <SubMenu alt="subMenu" styleType={styleType} user={user} changeUserFighter={changeUserFighter} userFighter={userFighter} clickHandler={clickHandler} toggleSubMenu={toggleSubMenu} selectedOption={selectedOption}></SubMenu> :
            <div className={classes.fightMenu}>
                <div className={`${classes.fightMenuImg} ${classes[styleType]}`}>
                    <ul className={classes.optionsContainer}>
                        <div className={classes.options}>
                            <Button styleType={styleType} completeWidth="true" onClick={() => toggleSubMenu("fighters")} value={t('fightmenu.fighters')} />
                        </div>
                        <div className={classes.options}>
                            <Button styleType={styleType} completeWidth="true" onClick={() => toggleSubMenu("run")} value={t('fightmenu.run')} />
                        </div>
                        <div className={classes.options}>
                            <Button styleType={styleType} completeWidth="true" onClick={() => toggleSubMenu("attacks")} value={t('fightmenu.attacks')} />
                        </div>
                        <div className={classes.options}>
                            <Button styleType={styleType} completeWidth="true" onClick={() => toggleSubMenu("objects")} value={t('fightmenu.objects')} />
                        </div>
                    </ul>
                </div>
            </div >
        }</div>
    )
}

export default FightMenu