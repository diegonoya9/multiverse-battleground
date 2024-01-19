import classes from './SettingsPage.module.css'
import Button from '../components/UI/Button'
import Modal from '../components/UI/Modal'
import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MyContext } from '../context/MyContext';
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../assets/sounds/music/OverNow.WAV"
import { useNavigate } from 'react-router-dom';
const SettingsPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const { userContext, setUser } = useContext(MyContext);
    let user = userContext.user
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState()
    const backEndUrl = userContext.backEndUrl
    const [volumes, setVolumes] = useState({
        bg: user.bg_volume,
        sound: user.sound_volume,
        sfx: user.sfx_volume
    })
    const audioStyle = {
        display: 'none',
    };
    const saveChanges = () => {
        setModalContent('Saving settings..')
        setShowModal(true)
        const parameters = [{
            user_id: user.user_id,
            bg: volumes.bg,
            sound: volumes.sound,
            sfx: volumes.sfx,
        }]
        fetch(backEndUrl + '/updateuserconfig', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters)
        }).then(() => {
            let newUser = { ...user }
            newUser.bg = volumes.bg
            newUser.sound = volumes.sound
            newUser.sfx = volumes.sfx
            setUser(newUser)
            setModalContent('Settings saved.')
        })
    }
    const handleVolumeChange = (origin, event) => {
        const newVolume = parseInt(event.target.value);
        setVolumes((prevValue) => {
            return { ...prevValue, [origin]: newVolume }
        })
    }
    const changeVolume = (origin, action) => {
        if (action === "increase") {
            if (volumes[origin] < 100) {
                setVolumes((prevValue) => {
                    let newVolume = prevValue[origin] + 1
                    return { ...prevValue, [origin]: parseFloat(newVolume.toFixed(1)) }
                })
            }
        }
        if (action === "decrease") {
            if (volumes[origin] > 0) {
                setVolumes((prevValue) => {
                    let newVolume = prevValue[origin] - 1
                    return { ...prevValue, [origin]: parseFloat(newVolume.toFixed(1)) }
                })
            }
        }
    }
    const closeModal = () => {
        if (modalContent !== "Saving settings..") {
            setShowModal(false)
            setModalContent('')
        }
    }
    const handleAudioEnd = (e) => {
        // Reiniciar la reproducción cuando la canción termine
        e.target.play();
    };
    return (
        <div className={classes.container}>
            <ReactAudioPlayer onEnded={handleAudioEnd} src={musicFile} volume={volumes.bg / 100} autoPlay controls style={audioStyle} />
            {showModal && <Modal styleType={"battlegroundColiseum"} onClose={closeModal} color="white">
                {modalContent}
            </Modal>}
            <Button colorType="lightgreen" value={t('settingspage.back')} onClick={() => { navigate('/') }}></Button>
            {volumes && Object.entries(volumes).map(([key, value]) => (
                <div className={classes.settingsContainer} key={key}>
                    <div className={classes.optionContainer}>
                        {t(`settingspage.${key}`)} : {volumes[key]}
                        <div >
                            <Button value="-" onClick={() => changeVolume(key, "decrease")} />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={value}
                                onChange={(event) => handleVolumeChange(key, event)}
                            />
                            <Button value="+" onClick={() => changeVolume(key, "increase")} />
                        </div>
                    </div>
                </div>
            ))}
            <Button colorType="lightgreen" value={t('settingspage.save')} onClick={() => { saveChanges() }}></Button>
        </div>
    )
}

export default SettingsPage