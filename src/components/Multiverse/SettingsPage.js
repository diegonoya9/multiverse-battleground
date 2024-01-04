import classes from './SettingsPage.module.css'
import Button from '../UI/Button'
import { useState , useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { MyContext } from '../../context/MyContext';
const SettingsPage = ({ changeMultiverseActivePage, user,updateUser }) => {
    const { t } = useTranslation();
    const { userContext } = useContext(MyContext);
    const backEndUrl = userContext.backEndUrl
    const [volumes, setVolumes] = useState({
        bg: user.bg_volume,
        sound: user.sound_volume,
        sfx: user.sfx_volume
    })
    const saveChanges = () => {
        const parameters = [{
            user_id: user.user_id,
            bg: volumes.bg,
            sound: volumes.sound,
            sfx: volumes.sfx,
        }]
        fetch(backEndUrl+'/updateuserconfig',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(parameters)
        }).then(() => {
            updateUser()
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
    return (
        <div>
            <Button colorType="lightgreen" value={t('settingspage.back')} onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
            {volumes && Object.entries(volumes).map(([key, value]) => (
                <div key={key}>
                    {t(`settingspage.${key}`)} : {volumes[key]}
                    <Button value="-" onClick={() => changeVolume(key, "decrease")} />
                    <Button value="+" onClick={() => changeVolume(key, "increase")} />
                </div>
            ))}
            <Button colorType="lightgreen" value={t('settingspage.save')} onClick={() => { saveChanges() }}></Button>
        </div>
    )
}

export default SettingsPage