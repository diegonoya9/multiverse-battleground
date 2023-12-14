import classes from './Battleground.module.css'
import Fighter from './Fighter'
import FightMenu from '../UI/FightMenu'
import { memo, useEffect, useState } from 'react'
import useBattleLogic from '../Hooks/use-battleLogic.js'
import ReactAudioPlayer from 'react-audio-player';
import musicFile from '../../assets/sounds/music/AndWeDieYoung.WAV';
import Modal from '../UI/Modal.js'

const Battleground = ({ changeActivePage }) => {
    const audioStyle = {
        display: 'none', // Oculta el reproductor de audio visualmente
    };
    const [showLevelUp, setShowLevelUp] = useState(false);
    const { turn, enemyAI, userLogic, attack, user, userFighter, enemyFighter, changeUserFighter, changeEnemyFighter, battleEnded, endBattle, showModal, onCloseModal, modalContent } = useBattleLogic(setShowLevelUp)
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
        let fightersInitialValues = [
            {
                /* Charizard */
                attack: 100,
                defense: 100,
                specialAttack: 180,
                specialDefense: 65,
                maxHp: 250
            },
            {
                /* Goku */
                attack: 80,
                defense: 120,
                specialAttack: 150,
                specialDefense: 65,
                maxHp: 100
            },
            {
                /* Mew */
                attack: 100,
                defense: 65,
                specialAttack: 130,
                specialDefense: 65,
                maxHp: 150
            },
            {
                /* Batman */
                attack: 150,
                defense: 150,
                specialAttack: 65,
                specialDefense: 65,
                maxHp: 300
            },
            {
                /* Michael */
                attack: 75,
                defense: 65,
                specialAttack: 65,
                specialDefense: 65,
                maxHp: 200
            },
            {
                /* Vegeta */
                attack: 65,
                defense: 120,
                specialAttack: 65,
                specialDefense: 120,
                maxHp: 100
            },
        ]
        for (let fighterId = 1; fighterId <= 6; fighterId++) {
            let prevAccuracy = 65
            let prevAttack = 10
            let prevSpecialAttack = 10
            let prevDefense = 10
            let prevSpecialDefense = 10
            let prevMaxHp = 65
            for (let level = 1; level <= 100; level++) {
                const xp = calculateXp(level);
                let attack = Math.max(Math.floor(Math.random() * fightersInitialValues[fighterId - 1].attack) + level * 5 + 10, prevAttack);
                let specialAttack = Math.max(Math.floor(Math.random() * fightersInitialValues[fighterId - 1].specialAttack) + level * 5 + 10, prevSpecialAttack);
                let defense = Math.max(Math.floor(Math.random() * fightersInitialValues[fighterId - 1].defense) + level * 5 + 10, prevDefense);
                let specialDefense = Math.max(Math.floor(Math.random() * fightersInitialValues[fighterId - 1].specialDefense) + level * 5 + 10, prevSpecialDefense);
                let maxHp = Math.max(Math.floor(Math.random() * fightersInitialValues[fighterId - 1].maxHp) + level * 100 + 100, prevMaxHp);
                let accuracy = Math.max(Math.floor(Math.random() * 65) + level + 1, prevAccuracy);
                prevAccuracy = accuracy
                prevAttack = attack
                prevSpecialAttack = specialAttack
                prevDefense = defense
                prevSpecialDefense = specialDefense
                prevMaxHp = maxHp

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
        //console.log(levels)
    };
    useEffect(() => {
        const handleOrientationChange = () => {
            const isHorizontal = window.matchMedia("(orientation: landscape)").matches;

            if (!isHorizontal) {
                // Rotar la aplicación o aplicar estilos específicos para la orientación vertical
                document.documentElement.style.transform = "rotate(90deg)";
            } else {
                // La orientación es horizontal, no hacer nada o revertir los cambios si es necesario
                document.documentElement.style.transform = "none";
            }
        };

        // Agregar el evento de cambio de orientación
        window.addEventListener('orientationchange', handleOrientationChange);

        // Llamar a la función para verificar la orientación al cargar la aplicación
        handleOrientationChange();

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);
    useEffect(() => {
        // Llamada a la función para generar y guardar los niveles
        generateLevels();
    }, []);

    return (
        <div className={classes.battleground}>
            {showModal && !battleEnded.finished && <Modal onClose={onCloseModal} color="white">{modalContent}</Modal>}
            <ReactAudioPlayer src={musicFile} id="audioPlayer" autoPlay controls style={audioStyle} />
            {attack.active && turn === "enemy" && !battleEnded.finished && attack.inflictedOn === "user" && <img alt="enemyAttack" className={classes["enemy-attack-animation"]} src={attack.src} />}
            {attack.active && turn === "user" && !battleEnded.finished && attack.inflictedOn === "enemy" && <img alt="userAttack" className={classes["attack-animation"]} src={attack.src} />}
            {battleEnded.finished && <div className={classes.battleEnded}>
                {showLevelUp && <div className={classes.divBattleEnded}>Tu {userFighter.name} subió de nivel</div>}
                {battleEnded.winner === "user" && user && <div className={classes.divBattleEnded}>{user.name} WON</div>}
                {battleEnded.winner === "enemy" && <div className={classes.divBattleEnded}>Enemy WON</div>}
                {battleEnded.winner === "ran" && user && <div className={classes.divBattleEnded}>{user.name} ran away</div>}
                <input className={classes.endBattleButton} type="button" onClick={() => restartGame()} value="Main Menu" />
            </div>}
            {userFighter && !battleEnded.finished && <Fighter fighter={userFighter} user="user">
                {attack.active && turn === "user" && attack.inflictedOn === "user" && <img alt="userAttack" className={classes.userPowerUp} src={attack.src} />}
            </Fighter>}
            {enemyFighter && !battleEnded.finished && <Fighter fighter={enemyFighter} user="enemy">
                {attack.active && turn === "enemy" && attack.inflictedOn === "enemy" && <img alt="enemyAttack" className={classes.enemyPowerUp} src={attack.src} />}
            </Fighter>}
            {!battleEnded.finished && menuActive && <FightMenu user={user} changeUserFighter={changeUserFighter} userFighter={userFighter} enemyFighter={enemyFighter} clickHandler={handleSubMenuOption}></FightMenu>}

        </div>
    )
}

export default memo(Battleground)