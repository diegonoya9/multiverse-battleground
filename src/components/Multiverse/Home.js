import { useState } from "react"
import Multiverse from "./Multiverse"
import FightModal from "./FightModal"
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
            {showModal && <FightModal showModal={showModal} onStartAdventure={handleStartAdventure} />}
            {activePage && activePage === 1 && !showModal && <Multiverse changeActivePage={changeActivePage}></Multiverse>}
            {activePage && activePage === 2 && !showModal && <Battleground changeActivePage={changeActivePage}></Battleground>}
        </div>
    )
}

export default Home