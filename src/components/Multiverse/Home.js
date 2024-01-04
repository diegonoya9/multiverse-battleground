import { useState } from "react"
import Multiverse from "./Multiverse"
import Modal from "../UI/Modal"
import Battleground from "../Fights/Battleground"
import classes from './Home.module.css'
import Button from "../UI/Button"
import { useTranslation } from 'react-i18next';
const Home = () => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(true);
    const handleStartAdventure = () => {
        setShowModal(false);
    };
    const [activePage, setActivePage] = useState(1)
    const changeActivePage = (page) => {
        setActivePage(page)
    }
    return (
        <div id="homeDiv" className={classes.homeDiv}>
            {showModal && <Modal onClose={handleStartAdventure} color="white"  >
                <h1 >{t('home.welcome')}</h1>
                <p style={{ color: '#fff' }}>{t('home.getReady')}</p>
                <Button colorType="green" value={t('home.start')} onClick={() => handleStartAdventure()}>
                </Button></Modal>}
            {activePage && activePage === 1 && !showModal && <Multiverse changeActivePage={changeActivePage}></Multiverse>}
            {activePage && activePage === 2 && !showModal && <Battleground changeActivePage={changeActivePage}></Battleground>}
        </div>
    )
}

export default Home