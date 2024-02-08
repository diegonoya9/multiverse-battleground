import classes from './Battleground.module.css'
import Fighter from './Fighter'
import FightMenu from './FightMenu.js'
import { memo, useEffect, useState, useContext } from 'react'
import useBattleLogic from '../Hooks/use-battleLogic.js'
import ReactAudioPlayer from 'react-audio-player';
import Modal from '../UI/Modal.js'
import Button from '../UI/Button.js'
import LifeBar from './LifeBar'
import ActionsList from './ActionsList.js'
import { MyContext } from '../../context/MyContext.js'
import Loading from '../UI/Loading.js'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
const Battleground = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const audioStyle = {
        display: 'none', // Oculta el reproductor de audio visualmente
    };
    const { userContext } = useContext(MyContext);
    let userName = userContext.userName
    let bg = userContext.bg
    let sfx = userContext.sfx
    let currentMission = userContext.currentMission
    let currentLevel = userContext.currentLevel
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
    const { userAttacked, turn, enemyAI, inflictedActions, userLogic, attack, user, userFighter, enemyFighter, changeUserFighter, battleEnded, endBattle, showModal, onCloseModal, modalContent, changeShowModal, startNewFight } = useBattleLogic(setShowLevelUp)
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
        if (turn === "enemy" && enemyFighter && !battleEnded.finished && enemyFighter.current_hp === 0 && !attack.active) {
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

    const restartGame = () => {
        setShowLevelUp(false)
        navigate('/')
    }
    const newFight = () => {
        setShowLevelUp(false)
        setMenuActive(true)
        startNewFight()
    }
    const selectTheme = () => {
        selectSong()
        selectBattlegroundType()
    }
    const selectSong = () => {
        let randomSong = Math.floor(Math.random() * songs.length)
        setSong(songs[randomSong].src)
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
        if (userAttacked.active === "user" || userAttacked.active === "userPowerUp" || userAttacked.active === "enemy" || userAttacked.active === "enemyPowerUp") {
            if (audioSfx) {
                if (userAttacked.sfx) {
                    audio = userAttacked.sfx
                }
                setSfx(audio)
            }
        }
    }, [userAttacked])
    useEffect(() => {
        const audioSfx = document.getElementById('audioSfxPlayer');
        if (Sfx && user) {
            audioSfx.play()
        }
    }, [Sfx, user])
    useEffect(() => {
        selectTheme()
    }, []);
    return (
        <div alt="battlegroundBackground" className={`${classes.battleground} ${classes[battlegroundType]}`}>
            {!userFighter && !enemyFighter && !battleEnded.finished && <Loading />}
            {showModal && !showSelectFighter && !battleEnded.finished && <Modal styleType={battlegroundType} onClose={onCloseModal} color="white">{modalContent}</Modal>}
            {song && user && <ReactAudioPlayer src={`${song}`} id="audioPlayer" onEnded={() => selectSong()} volume={bg / 100} autoPlay controls style={audioStyle} />}
            {song && <ReactAudioPlayer onEnded={handleSfxEnded} src={`${Sfx}`} volume={sfx / 100} id="audioSfxPlayer" controls style={audioStyle} />}
            {attack.active && turn === "enemy" && !battleEnded.finished && attack.inflicted_on === "user" && <img alt="enemyAttack" className={classes["enemy-attack-animation"]} src={attack.src} />}
            {attack.active && turn === "user" && !battleEnded.finished && attack.inflicted_on === "enemy" && <img alt="userAttack" className={classes["attack-animation"]} src={attack.src} />}
            {battleEnded.finished && battlegroundType && <div className={classes.battleEnded}>
                <Modal color="white" styleType={battlegroundType} onClose={() => { return }}>
                    {showLevelUp && <h2 className={classes[battlegroundType]}>{t('battleground.your')} {userFighter.name} {t('battleground.levelUp')}</h2>}
                    {battleEnded.winner === "user" && user && <h2 className={classes[battlegroundType]}>{userName} {t('battleground.won')}</h2>}
                    {battleEnded.winner === "enemy" && <h2 className={classes[battlegroundType]}>{t('battleground.enemyWon')}</h2>}
                    {battleEnded.winner === "ran" && user && <h1 className={classes[battlegroundType]}>{userName} {t('battleground.ran')}</h1>}
                    <Button styleType={battlegroundType} colorType={"green"} onClick={() => restartGame()} value={t('battleground.main')} />
                    {battleEnded.winner === "user" && (currentMission === 0 || (currentMission.missionlevels.length > (currentLevel))) && <Button styleType={battlegroundType} colorType={"green"} onClick={() => newFight()} value={t('battleground.restart')} />}
                    {battleEnded.winner === "user" && (currentMission !== 0 && (currentMission.missionlevels.length <= (currentLevel))) && <div>
                        <p>Prizes</p>
                        {currentMission.missionprizes.map((prize) => {
                            return prize.objects.name + " : " + prize.value
                        })}
                    </div>}
                </Modal>
            </div>}
            {showSelectFighter && userFighter.current_hp === 0 && <Modal onClose={() => { }}>{user.fighters.map((fighter, i) => {
                return fighter.in_party === "true" && fighter.current_hp > 0 && <div className={classes.options} >
                    <Button completeWidth="true" key={fighter.name + i} value={fighter.name} styleType={battlegroundType} onClick={() => { setShowSelectFighter(false); changeUserFighter(fighter) }}><img alt="fighter mini" src={fighter.img_front} className={classes.miniImgMenu} /></Button>
                </div>
            })}</Modal>}
            {userFighter && userFighter.current_hp > 0 && !battleEnded.finished && <Fighter userAttacked={userAttacked.active} turn={turn} styleType={battlegroundType} attack={attack} fighter={userFighter} user="user">
            </Fighter>}

            {userFighter && userFighter.current_hp > 0 && !battleEnded.finished && <div className={`${classes.userHeaderContainer} ${classes.headerContainer} ${classes["userHeader" + battlegroundType]}`}>
                <LifeBar fighter={userFighter} styleType={battlegroundType}></LifeBar>
            </div>
            }
            {inflictedActions[0] && <ActionsList inflictedActions={inflictedActions} turn={turn}></ActionsList>}
            {
                enemyFighter && !battleEnded.finished && <Fighter attack={attack} userAttacked={userAttacked.active} turn={turn} className={classes.notActive} styleType={battlegroundType} fighter={enemyFighter} user="enemy">
                </Fighter>
            }

            {
                enemyFighter && !battleEnded.finished && <div className={`${classes.enemyHeaderContainer} ${classes.headerContainer} ${classes["userHeader" + battlegroundType]}`}>
                    <LifeBar fighter={enemyFighter} styleType={battlegroundType}></LifeBar>
                </div>
            }

            {!battleEnded.finished && menuActive && userFighter && userFighter.current_hp > 0 && < FightMenu styleType={battlegroundType} user={user} changeUserFighter={changeUserFighter} userFighter={userFighter} enemyFighter={enemyFighter} clickHandler={handleSubMenuOption}></FightMenu>}

        </div >
    )
}

export default memo(Battleground)