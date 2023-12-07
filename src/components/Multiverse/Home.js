import { useState } from "react"
import Multiverse from "./Multiverse"
import Battleground from "../Fights/Battleground"
const Home = () => {
    const [userPage, setUserPage] = useState(1)
    const changeActivePage = (page) => {
        setUserPage(page)
    }
    return (
        <div>
            {userPage && userPage === 1 && <Multiverse changeActivePage={changeActivePage}></Multiverse>}
            {userPage && userPage === 2 && <Battleground changeActivePage={changeActivePage}></Battleground>}
        </div>
    )
}

export default Home