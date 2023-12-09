import classes from './Battleground.module.css'
import Fighter from './Fighter'
import FightMenu from '../UI/FightMenu'
import { memo, useEffect, useState } from 'react'
import useBattleState from '../Hooks/use-battleState'
import fightersLevelsModel from '../../model/fightersLevelsModel.js'
import useBattleLogic from '../Hooks/use-battleLogic.js'

const Battleground = ({ changeActivePage }) => {
    const { turn, enemyAI, userLogic, attack, user, userFighter, enemyFighter, changeUserFighter, levelUpFighter, changeEnemyFighter } = useBattleLogic()
    const [fightersLevels] = useState(fightersLevelsModel)
    const { battleEnded, endBattle } = useBattleState()
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [menuActive, setMenuActive] = useState(true)
    const handleSubMenuOption = (option, selectedOption) => {
        if (turn === "user") {
            userLogic(option, selectedOption, setMenuActive)
        }
    }
    useEffect(() => {
        if (turn === "enemy" && !battleEnded.finished) {
            enemyAI(setMenuActive, battleEnded)
        }
    }, [turn])
    useEffect(() => {
        if (enemyFighter && enemyFighter.currentHP === 0) {
            endBattle("user", true)
        }
        if (userFighter && userFighter.currentHP === 0) {
            endBattle("enemy", true)
        }
    }, [userFighter, enemyFighter])
    useEffect(() => {
        if (battleEnded.finished && battleEnded.winner === "user" && userFighter) {
            let newCurrentXP = userFighter.currentXP + 100
            let newLevel = userFighter.level
            fightersLevels.forEach((fighterLevel) => {
                if (fighterLevel.fighterId === userFighter.fighterId && fighterLevel.level > userFighter.level && fighterLevel.minXp < newCurrentXP) {
                    newLevel = fighterLevel.level
                    setShowLevelUp(true)
                }
            })
            levelUpFighter(newCurrentXP, newLevel)
        }
    }, [battleEnded, userFighter])
    const restartGame = () => {
        endBattle(null, false)
        setShowLevelUp(false)
        changeEnemyFighter()
        changeActivePage(1)
    }

    return (
        <div className={classes.battleground}>
            {showLevelUp && <h1>Tu luchador subió de nivel</h1>}
            {attack.active && turn === "user" && attack.inflictedOn === "enemy" && <img alt="userAttack" className={classes["attack-animation"]} src={attack.src} />}
            {attack.active && turn === "user" && attack.inflictedOn === "user" && <img alt="userAttack" className={classes.userPowerUp} src={attack.src} />}
            {attack.active && turn === "enemy" && attack.inflictedOn === "user" && <img alt="enemyAttack" className={classes["enemy-attack-animation"]} src={attack.src} />}
            {attack.active && turn === "enemy" && attack.inflictedOn === "enemy" && <img alt="enemyAttack" className={classes.enemyPowerUp} src={attack.src} />}
            {battleEnded.finished && <div>
                <h1>{battleEnded.winner} WON</h1>
                <input type="button" onClick={() => restartGame()} value="Main Menu" />
            </div>}
            {userFighter && !battleEnded.finished && <Fighter fighter={userFighter} user="user"></Fighter>}
            {enemyFighter && !battleEnded.finished && <Fighter fighter={enemyFighter} user="enemy"></Fighter>}
            {!battleEnded.finished && menuActive && <FightMenu user={user} changeUserFighter={changeUserFighter} userFighter={userFighter} enemyFighter={enemyFighter} clickHandler={handleSubMenuOption} changeActivePage={changeActivePage} ></FightMenu>}

        </div>
    )
}

export default memo(Battleground)