import classes from './Battleground.module.css'
import Fighter from './Fighter'
import FightMenu from '../UI/FightMenu'
import { memo, useEffect, useState } from 'react'
import useBattleLogic from '../Hooks/use-battleLogic.js'
import ReactAudioPlayer from 'react-audio-player';
import musicFile from '../../assets/sounds/music/master.mp3';

const Battleground = ({ changeActivePage }) => {
    const audioStyle = {
        display: 'none', // Oculta el reproductor de audio visualmente
    };
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
    const calculateXp = (level) => {
        // Ajuste para que al llegar al nivel 99 se necesiten 5,000,000 de experiencia
        if (level <= 99) {
            return level * (level * 100);
        }

        // Resto de los niveles
        return level * 5000;
    };
    const generateLevels = () => {
        let levels = [];
        for (let fighterId = 1; fighterId <= 4; fighterId++) {
            for (let level = 1; level <= 100; level++) {
                const xp = calculateXp(level);
                let attack = Math.floor(Math.random() * 25) + level * 5 + 10;
                let specialAttack = Math.floor(Math.random() * 30) + level * 5 + 10;
                let defense = Math.floor(Math.random() * 52) + level * 5 + 10;
                let specialDefense = Math.floor(Math.random() * 40) + level * 5 + 10;
                let maxHp = Math.floor(Math.random() * 400) + level * 100 + 100;
                let accuracy = Math.floor(Math.random() * 40) + level + 10;


                // Adjust max values for level 100
                attack += 90 * (level - 1);
                specialAttack += 90 * (level - 1);
                defense += 90 * (level - 1);
                specialDefense += 90 * (level - 1);
                maxHp += 900 * (level - 1);


                const levelData = {
                    fighterId,
                    level,
                    minXp: xp,
                    attack,
                    specialAttack,
                    defense,
                    specialDefense,
                    maxHp,
                    accuracy,
                };

                levels.push(levelData);
            }
        }
    };
    useEffect(() => {
        // Llamada a la función para generar y guardar los niveles
        generateLevels();
    }, []);

    return (
        <div className={classes.battleground}>
            <ReactAudioPlayer src={musicFile} id="audioPlayer" autoPlay controls style={audioStyle} />
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