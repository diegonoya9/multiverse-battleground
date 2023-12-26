import classes from './Battleground.module.css'
import Fighter from './Fighter'
import FightMenu from './FightMenu.js'
import { memo, useEffect, useState } from 'react'
import useBattleLogic from '../Hooks/use-battleLogic.js'
import ReactAudioPlayer from 'react-audio-player';
import Modal from '../UI/Modal.js'
import Button from '../UI/Button.js'
import LifeBar from './LifeBar'
import ActionsList from './ActionsList.js'

const Battleground = ({ changeActivePage }) => {
    const audioStyle = {
        display: 'none', // Oculta el reproductor de audio visualmente
    };
    const songs = [
        { id: 1, title: 'Song 1', src: '/assets/sounds/music/AndWeDieYoung.WAV' },
        { id: 2, title: 'Song 2', src: '/assets/sounds/music/FourHorsemen.WAV' },
        { id: 3, title: 'Song 3', src: '/assets/sounds/music/africa.mp3' },
        { id: 4, title: 'Song 4', src: '/assets/sounds/music/billie.mp3' },
        { id: 5, title: 'Song 5', src: '/assets/sounds/music/chop.mp3' },
        { id: 6, title: 'Song 6', src: '/assets/sounds/music/clint.mp3' },
        { id: 7, title: 'Song 7', src: '/assets/sounds/music/countdown.mp3' },
        { id: 8, title: 'Song 8', src: '/assets/sounds/music/dust.mp3' },
        { id: 9, title: 'Song 9', src: '/assets/sounds/music/end.mp3' },
        { id: 10, title: 'Song 10', src: '/assets/sounds/music/feel.mp3' },
        { id: 11, title: 'Song 11', src: '/assets/sounds/music/lucky.mp3' },
        { id: 13, title: 'Song 13', src: '/assets/sounds/music/sandman.mp3' },
        { id: 14, title: 'Song 14', src: '/assets/sounds/music/seven.mp3' },
        { id: 15, title: 'Song 15', src: '/assets/sounds/music/take.mp3' },
        { id: 16, title: 'Song 16', src: '/assets/sounds/music/thriller.mp3' },
        { id: 17, title: 'Song 17', src: '/assets/sounds/music/tiger.mp3' },
        { id: 18, title: 'Song 18', src: '/assets/sounds/music/uptown.mp3' },
        { id: 19, title: 'Song 19', src: '/assets/sounds/music/welcome.mp3' },
        { id: 20, title: 'Song 20', src: '/assets/sounds/music/what.mp3' },
        { id: 21, title: 'Song 21', src: '/assets/sounds/music/harder.mp3' },
        // Agrega más canciones según sea necesario
    ];
    const [showLevelUp, setShowLevelUp] = useState(false)
    const [showSelectFighter, setShowSelectFighter] = useState(false)
    const battlegroundTypes = ["battlegroundAirport", "battlegroundRoute", "battlegroundColiseum", "battlegroundCiberspace"]
    const [battlegroundType, setBattlegroundType] = useState();
    const [song, setSong] = useState();
    const [Sfx, setSfx] = useState();
    const { userAttacked, turn, enemyAI, inflictedActions, userLogic, attack, user, userFighter, enemyFighter, changeUserFighter, cure, setCure, changeEnemyFighter, battleEnded, endBattle, showModal, onCloseModal, modalContent, changeShowModal, startNewFight } = useBattleLogic(setShowLevelUp)
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
        if (enemyFighter && enemyFighter.current_hp === 0 && !attack.active) {
            changeShowModal()
            endBattle("user", true)
        }
        if (userFighter && userFighter.current_hp === 0) {
            let cant = 0
            user.fighters.forEach((fighter) => {
                if (fighter.in_party === "true" && fighter.current_hp > 0) {
                    cant++
                }
            })
            if (cant > 0) {
                setShowSelectFighter(true)
            } else {
                endBattle("enemy", true)
            }
        }
    }, [userFighter, enemyFighter, turn])




    const [showH1, setShowH1] = useState(false);
    useEffect(() => {
        if (cure > 0) {
            setShowH1(true); // Mostrar el h1 si 'cure' es mayor que 0

            // Ocultar el h1 después de 1 segundo
            setTimeout(() => {
                setShowH1(false);
                setCure(0); // 1000 milisegundos = 1 segundo
            }, 1000)
        }

    }, [cure]);



    const restartGame = () => {
        setShowLevelUp(false)
        changeActivePage(1)
    }
    const newFight = () => {
        endBattle(null, false)
        setShowLevelUp(false)
        setMenuActive(true)
        startNewFight()
        //changeEnemyFighter()
        // changeActivePage(1)
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
            {
                /* Ikki */
                attack: 85,
                defense: 120,
                specialAttack: 95,
                specialDefense: 120,
                maxHp: 100
            }
        ]
        let fighter_level_id = 1;
        for (let fighterId = 1; fighterId <= 7; fighterId++) {
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
                    fighter_level_id
                };
                fighter_level_id++
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
        let audio = '/assets/sounds/SFX/Ha.mp3'
        if (userAttacked.active === "user") {
            if (audioSfx) {
                if (userAttacked.Sfx) {
                    audio = userAttacked.Sfx
                }
                setSfx(audio)
            }
        }
        if (userAttacked.active === "userPowerUp") {
            if (audioSfx) {
                if (userAttacked.Sfx) {
                    audio = userAttacked.Sfx
                }
                setSfx(audio)
            }
        }
        if (userAttacked.active === "enemy") {
            if (audioSfx) {
                if (userAttacked.Sfx) {
                    audio = userAttacked.Sfx
                }
                setSfx(audio)
            }
        }
        if (userAttacked.active === "enemyPowerUp") {
            if (audioSfx) {
                if (userAttacked.Sfx) {
                    audio = userAttacked.Sfx
                }
                setSfx(audio)
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
        //generateLevels();
        selectTheme()
    }, []);

    return (
        <div className={`${classes.battleground} ${classes[battlegroundType]}`}>
            {showModal && !showSelectFighter && !battleEnded.finished && <Modal styleType={battlegroundType} onClose={onCloseModal} color="white">{modalContent}</Modal>}
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
                    {battleEnded.winner === "user" && <Button styleType={battlegroundType} colorType={"green"} onClick={() => newFight()} value="Keep Fighting" />}
                </Modal>
            </div>}
            {showSelectFighter && userFighter.current_hp === 0 && <Modal onClose={() => { }}>{user.fighters.map((fighter, i) => {
                return fighter.in_party === "true" && fighter.current_hp > 0 && <div className={classes.options} >
                    <Button completeWidth="true" key={fighter.name + i} value={fighter.name} styleType={battlegroundType} onClick={() => { setShowSelectFighter(false); changeUserFighter(fighter) }}><img alt="fighter mini" src={fighter.img_front} className={classes.miniImgMenu} /></Button>
                </div>
            })}</Modal>}
            {userFighter && userFighter.currentHP > 0 && !battleEnded.finished && <Fighter userAttacked={userAttacked.active} turn={turn} styleType={battlegroundType} attack={attack} fighter={userFighter} user="user">
            </Fighter>}

            {userFighter && userFighter.currentHP > 0 && !battleEnded.finished && <div className={`${classes.userHeaderContainer} ${classes.headerContainer} ${classes["userHeader" + battlegroundType]}`}>
                <LifeBar fighter={userFighter} styleType={battlegroundType}></LifeBar>
            </div>
            }
            {inflictedActions[0] && <ActionsList inflictedActions={inflictedActions} turn={turn}></ActionsList>}
            {showH1 && cure > 0 && <h1 className={`${classes.punchRecive} ${classes.totalCure}`} set>{`${cure} `}</h1>}
            {
                enemyFighter && !battleEnded.finished && <Fighter attack={attack} userAttacked={userAttacked.active} turn={turn} className={classes.notActive} styleType={battlegroundType} fighter={enemyFighter} user="enemy">
                </Fighter>
            }

            {
                enemyFighter && !battleEnded.finished && <div className={`${classes.enemyHeaderContainer} ${classes.headerContainer} ${classes["userHeader" + battlegroundType]}`}>
                    <LifeBar fighter={enemyFighter} styleType={battlegroundType}></LifeBar>
                </div>
            }

            {!battleEnded.finished && menuActive && userFighter && userFighter.currentHP > 0 && < FightMenu styleType={battlegroundType} user={user} changeUserFighter={changeUserFighter} userFighter={userFighter} enemyFighter={enemyFighter} clickHandler={handleSubMenuOption}></FightMenu>}

        </div >
    )
}

export default memo(Battleground)