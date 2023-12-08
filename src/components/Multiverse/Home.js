import { useCallback, useState } from "react"
import Multiverse from "./Multiverse"
import Battleground from "../Fights/Battleground"
const Home = () => {
    const [activePage, setActivePage] = useState(2)
    const changeActivePage = useCallback((page) => {
        setActivePage(page)
    }, [])
    return (
        <div>
            {activePage && activePage === 1 && <Multiverse changeActivePage={changeActivePage}></Multiverse>}
            {activePage && activePage === 2 && <Battleground changeActivePage={changeActivePage}></Battleground>}
        </div>
    )
}

export default Home