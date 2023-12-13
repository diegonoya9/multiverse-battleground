import { useState } from "react"
import Multiverse from "./Multiverse"
import Modal from "../UI/Modal"
import Battleground from "../Fights/Battleground"
import classes from './Home.module.css'

const Home = () => {
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
            {showModal && <Modal onClose={handleStartAdventure} backgroundColor="rgb(212, 130, 130)"  >
                <h1 style={{ color: '#ff4500' }}>Welcome to the Multiverse Battleground</h1>
                <p style={{ color: '#fff' }}>Get ready for epic battles!</p>
                <button className={classes.modalButton} onClick={() => handleStartAdventure()}>
                    Start Adventure!
                </button></Modal>}
            {activePage && activePage === 1 && !showModal && <Multiverse changeActivePage={changeActivePage}></Multiverse>}
            {activePage && activePage === 2 && !showModal && <Battleground changeActivePage={changeActivePage}></Battleground>}
        </div>
    )
}

export default Home