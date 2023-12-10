import { useState } from "react"
import Multiverse from "./Multiverse"
import Battleground from "../Fights/Battleground"

const Home = () => {
    const [activePage, setActivePage] = useState(() => {
        if (process.env.NODE_ENV === 'production') {
            // Código específico para el entorno de desarrollo
            return 1
        } else if (process.env.NODE_ENV === 'development') {
            // Código específico para el entorno de producción
            return 2
        }
    })
    const changeActivePage = (page) => {
        setActivePage(page)
    }
    return (
        <div>

            {activePage && activePage === 1 && <Multiverse changeActivePage={changeActivePage}></Multiverse>}
            {activePage && activePage === 2 && <Battleground changeActivePage={changeActivePage}></Battleground>}
        </div>
    )
}

export default Home