import classes from './Battleground.module.css'
import Fighter from './Fighter'
import FightMenu from './FightMenu.js'
import { memo, useEffect, useState } from 'react'
import useBattleLogic from '../Hooks/use-battleLogic.js'
import ReactAudioPlayer from 'react-audio-player';
import musicFile1 from '../../assets/sounds/music/AndWeDieYoung.WAV';
import musicFile2 from '../../assets/sounds/music/FourHorsemen.WAV';
import musicFile3 from '../../assets/sounds/music/OverNow.WAV';
import Modal from '../UI/Modal.js'
import Button from '../UI/Button.js'

const Battleground = ({ changeActivePage }) => {
    const audioStyle = {
        display: 'none', // Oculta el reproductor de audio visualmente
    };
    const songs = [
        { id: 1, title: 'Song 1', src: musicFile1 },
        { id: 2, title: 'Song 2', src: musicFile2 },
        { id: 3, title: 'Song 3', src: musicFile3 },
        // Agrega más canciones según sea necesario
    ];
    const [showLevelUp, setShowLevelUp] = useState(false)
    const battlegroundTypes = ["battlegroundAirport", "battlegroundRoute", "battlegroundColiseum", "battlegroundCiberspace"]
    const [battlegroundType, setBattlegroundType] = useState();
    const [song, setSong] = useState();
    const [Sfx, setSfx] = useState();
    const { userAttacked, turn, enemyAI, userLogic, attack, user, userFighter, enemyFighter, changeUserFighter, changeEnemyFighter, battleEnded, endBattle, showModal, onCloseModal, modalContent } = useBattleLogic(setShowLevelUp)
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
    }, [turn, battleEnded])
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
    const selectTheme = () => {
        selectSong()
        selectBattlegroundType()
    }
    const selectSong = () => {
        let randomBattleground = Math.floor(Math.random() * songs.length)
        setSong(songs[randomBattleground].src)
    }
    const handleSfxEnded = () => {
        setSfx(false)
    }
    const selectBattlegroundType = () => {
        let randomBattleground = Math.floor(Math.random() * battlegroundTypes.length)
        setBattlegroundType(battlegroundTypes[randomBattleground])
    }
    useEffect(() => {
        const audio = document.getElementById('audioPlayer');
        if (audio) {
            audio.play()
        }
    }, [song])
    useEffect(() => {
        const audioSfx = document.getElementById('audioSfxPlayer');
        if (userAttacked === "user") {
            if (audioSfx) {
                setSfx('/assets/sounds/SFX/Ha.mp3')
            }
        }
        if (userAttacked === "userPowerUp") {
            if (audioSfx) {
                setSfx('/assets/sounds/SFX/Ha.mp3')
            }
        }
        if (userAttacked === "enemy") {
            if (audioSfx) {
                setSfx('/assets/sounds/SFX/Ha.mp3')
            }
        }
        if (userAttacked === "enemyPowerUp") {
            if (audioSfx) {
                setSfx('/assets/sounds/SFX/Ha.mp3')
            }
        }
    }, [userAttacked])
    useEffect(() => {
        const audioSfx = document.getElementById('audioSfxPlayer');
        if (Sfx) {
            audioSfx.play()
        }
    }, [Sfx])
    useEffect(() => {
        // Llamada a la función para generar y guardar los niveles
        generateLevels();
        selectTheme()
    }, []);
    return (
        <div className={`${classes.battleground} ${classes[battlegroundType]}`}>
            {showModal && !battleEnded.finished && <Modal styleType={battlegroundType} onClose={onCloseModal} color="white">{modalContent}</Modal>}
            {song && <ReactAudioPlayer src={`${song}`} id="audioPlayer" autoPlay controls style={audioStyle} />}
            {song && <ReactAudioPlayer onEnded={handleSfxEnded} src={`${Sfx}`} id="audioSfxPlayer" controls style={audioStyle} />}
            {attack.active && turn === "enemy" && !battleEnded.finished && attack.inflictedOn === "user" && <img alt="enemyAttack" className={classes["enemy-attack-animation"]} src={attack.src} />}
            {attack.active && turn === "user" && !battleEnded.finished && attack.inflictedOn === "enemy" && <img alt="userAttack" className={classes["attack-animation"]} src={attack.src} />}
            {battleEnded.finished && battlegroundType && <div className={classes.battleEnded}>
                <Modal color="white" styleType={battlegroundType} onClose={() => restartGame()}>
                    {showLevelUp && <h2 className={classes[battlegroundType]}>Tu {userFighter.name} subió de nivel</h2>}
                    {battleEnded.winner === "user" && user && <h2 className={classes[battlegroundType]}>{user.name} WON</h2>}
                    {battleEnded.winner === "enemy" && <h2 className={classes[battlegroundType]}>Enemy WON</h2>}
                    {battleEnded.winner === "ran" && user && <h1 className={classes[battlegroundType]}>{user.name} ran away</h1>}
                    <Button styleType={battlegroundType} colorType={"green"} onClick={() => restartGame()} value="Main Menu" />
                </Modal>
            </div>}
            {userFighter && !battleEnded.finished && <Fighter userAttacked={userAttacked} turn={turn} styleType={battlegroundType} fighter={userFighter} user="user">
                {attack.active && turn === "user" && attack.inflictedOn === "user" && <img alt="userAttack" className={classes.userPowerUp} src={attack.src} />}
            </Fighter>}
            {enemyFighter && !battleEnded.finished && <Fighter userAttacked={userAttacked} turn={turn} className={classes.notActive} styleType={battlegroundType} fighter={enemyFighter} user="enemy">
                {attack.active && turn === "enemy" && attack.inflictedOn === "enemy" && <img alt="enemyAttack" className={classes.enemyPowerUp} src={attack.src} />}
            </Fighter>}
            {!battleEnded.finished && menuActive && <FightMenu styleType={battlegroundType} user={user} changeUserFighter={changeUserFighter} userFighter={userFighter} enemyFighter={enemyFighter} clickHandler={handleSubMenuOption}></FightMenu>}

        </div>
    )
}

export default memo(Battleground)