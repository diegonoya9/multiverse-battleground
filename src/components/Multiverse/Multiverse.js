import { useState } from "react"
import FightersPage from "./FightersPage.js"
import useUser from "../Hooks/use-user.js"

const Multiverse = ({ changeActivePage }) => {
    const [multiverseActivePage, setMultiverseActivePage] = useState("mainMenu")
    const { user } = useUser()
    return (
        <div>
            {multiverseActivePage === "mainMenu" &&
                <div>
                    <h1>Bienvenido</h1>
                    <input type="submit" onClick={(e) => { changeActivePage(2); console.log(e.target.value) }} value={'Fight'} />
                    <input type="submit" onClick={(e) => { setMultiverseActivePage("fighters") }} value={'Fighters'} />
                    <input type="submit" onClick={(e) => { console.log(e.target.value) }} value={'Bag'} />
                    <input type="submit" onClick={(e) => { console.log(e.target.value) }} value={'Shop'} />
                </div>
            }
            {multiverseActivePage === "fighters" && <FightersPage user={user}></FightersPage>}
        </div>
    )
}
export default Multiverse