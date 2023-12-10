import { useState } from "react"
import Multiverse from "./Multiverse"
import FightModal from "./FightModal"
import Battleground from "../Fights/Battleground"
import classes from './Home.module.css'

const Home = () => {
    const [showModal, setShowModal] = useState(true);

    const handleStartAdventure = () => {
        console.log(showModal)
        // Aquí puedes añadir lógica para iniciar la aventura
        console.log('Adventure started!');
        setShowModal(false);
    };
    const [activePage, setActivePage] = useState(() => {
        if (process.env.NODE_ENV === 'production') {
            // Código específico para el entorno de desarrollo
            return 1
        } else if (process.env.NODE_ENV === 'development') {
            // Código específico para el entorno de producción
            return 1
        }
    })
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