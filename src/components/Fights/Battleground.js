import classes from './Battleground.module.css'
import Fighter from './Fighter'
import FightMenu from '../UI/FightMenu'
import { memo, useEffect, useState } from 'react'
import useBattleLogic from '../Hooks/use-battleLogic.js'

const Battleground = ({ changeActivePage }) => {
    const [showLevelUp, setShowLevelUp] = useState(false);
    const { turn, enemyAI, userLogic, attack, user, userFighter, enemyFighter, changeUserFighter, changeEnemyFighter, battleEnded, endBattle } = useBattleLogic(setShowLevelUp)
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

    const restartGame = () => {
        endBattle(null, false)
        setShowLevelUp(false)
        changeEnemyFighter()
        changeActivePage(1)
    }

    return (
        <div className={classes.battleground}>
            {showLevelUp && <h1>Tu {userFighter.name} subió de nivel</h1>}
            {attack.active && turn === "user" && attack.inflictedOn === "enemy" && <img alt="userAttack" className={classes["attack-animation"]} src={attack.src} />}
            {attack.active && turn === "user" && attack.inflictedOn === "user" && <img alt="userAttack" className={classes.userPowerUp} src={attack.src} />}
            {attack.active && turn === "enemy" && attack.inflictedOn === "user" && <img alt="enemyAttack" className={classes["enemy-attack-animation"]} src={attack.src} />}
            {attack.active && turn === "enemy" && attack.inflictedOn === "enemy" && <img alt="enemyAttack" className={classes.enemyPowerUp} src={attack.src} />}
            {battleEnded.finished && <div>
                {battleEnded.winner === "user" && user && <h1>{user.name} WON</h1>}
                {battleEnded.winner === "enemy" && <h1>Enemy WON</h1>}
                {battleEnded.winner === "ran" && user && <h1>{user.name} ran away</h1>}
                <input type="button" onClick={() => restartGame()} value="Main Menu" />
            </div>}
            {userFighter && !battleEnded.finished && <Fighter fighter={userFighter} user="user"></Fighter>}
            {enemyFighter && !battleEnded.finished && <Fighter fighter={enemyFighter} user="enemy"></Fighter>}
            {!battleEnded.finished && menuActive && <FightMenu user={user} changeUserFighter={changeUserFighter} userFighter={userFighter} enemyFighter={enemyFighter} clickHandler={handleSubMenuOption}></FightMenu>}

        </div>
    )
}

export default memo(Battleground)