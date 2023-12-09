import { useState } from "react"
import FightersPage from "./FightersPage.js"
import useUser from "../Hooks/use-user.js"

const Multiverse = ({ changeActivePage }) => {
    const [multiverseActivePage, setMultiverseActivePage] = useState("mainMenu")
    const changeMultiverseActivePage = (activePage) => {
        setMultiverseActivePage(activePage)
    }
    const { user } = useUser("multiverse")
    return (
        <div>
            {multiverseActivePage === "mainMenu" &&
                <div>
                    <h1>Bienvenido</h1>
                    <input type="submit" onClick={(e) => { changeActivePage(2); }} value={'Fight'} />
                    <input type="submit" onClick={(e) => { changeMultiverseActivePage("fighters") }} value={'Fighters'} />
                    <input type="submit" onClick={(e) => { }} value={'Bag'} />
                    <input type="submit" onClick={(e) => { }} value={'Shop'} />
                </div>
            }
            {multiverseActivePage === "fighters" && <FightersPage changeMultiverseActivePage={changeMultiverseActivePage} user={user}></FightersPage>}
        </div>
    )
}
export default Multiverse