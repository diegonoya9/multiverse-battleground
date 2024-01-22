import { memo, useState, useEffect, useContext } from "react"
import classes from './Multiverse.module.css'
import Button from "../UI/Button.js"
import { MyContext } from '../../context/MyContext';
import { useTranslation } from 'react-i18next';
import Loading from "../UI/Loading.js"
import { useNavigate } from "react-router-dom"
const Multiverse = () => {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const { userContext, setUserName, setUser, setSound, setBg, setSfx, setCurrentMission } = useContext(MyContext);
    let activeUser = userContext.idUsuario
    let backEndUrl = userContext.backEndUrl
    let user = userContext.user
    //const [user, setUser] = useState()
    const [money, setMoney] = useState()
    useEffect(() => {
        if (user) {
            let newMoney = user.userobjects.filter((object) => {
                return object.objects.name === "Money"
            })
            setMoney(newMoney[0].quantity)
        }
    }, [user])
    useEffect(() => {
        setCurrentMission(0)
    }, [])
    useEffect(() => {
        fetch(backEndUrl + '/allusers/' + activeUser)
            .then(response => response.json())
            .then(data => {
                setUser(data[0])
                setUserName(data[0].name)
                setSound(data[0].sound_volume)
                setSfx(data[0].sfx_volume)
                setBg(data[0].bg_volume)
            })
    }, [activeUser])
    return (
        <div alt='mainDiv' className={`${classes.container} ${classes.notScrollable}`} >
            {user &&
                <div className={classes.mainMenu}>

                    <div id="divWelcome" className={classes.divWelcome}>
                        <img src={user.avatar} />
                        <h1 className={classes.h1}>{t('multiverse.welcome')} {user.name}</h1>
                        <h2 className={classes.h2}>{t('multiverse.money')} {money} pesos</h2>
                    </div>
                    <div className={classes.btnContainer} >
                        <Button value={t('multiverse.fight')} colorType="red" onClick={() => navigate('/battle')}></Button>
                        <Button value={t('multiverse.missions')} colorType="yellow" onClick={(e) => {
                            navigate('/missions');
                        }}></Button>
                        <Button value={t('multiverse.pvp')} colorType="yellow" onClick={(e) => {
                            navigate('/pvp');
                        }}></Button>
                        <Button value={t('multiverse.fighters')} colorType="brown" onClick={(e) => {
                            navigate('/fighters');
                        }}></Button>
                        <Button value={t('multiverse.bag')} colorType="green" onClick={(e) => {
                            navigate('/bag');
                        }}></Button>
                        <Button value={t('multiverse.shop')} colorType="yellow" onClick={(e) => {
                            navigate('/shop');
                        }}></Button>
                        <Button value={t('multiverse.config')} colorType="blue" onClick={(e) => {
                            navigate('/config');
                        }}></Button>
                        {user && user.profile === "Admin" &&
                            <Button value={t('multiverse.users')} colorType="blue" onClick={(e) => {
                                navigate('/users');
                            }}></Button>
                        }
                    </div>
                </div>
            }
            {!user && <Loading></Loading>}
        </div >
    )
}
export default memo(Multiverse)
