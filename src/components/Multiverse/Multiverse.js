import { useState, useEffect } from "react"
import FightersPage from "./FightersPage.js"
import useUser from "../Hooks/use-user.js"
import classes from './Multiverse.module.css'

const Multiverse = ({ changeActivePage }) => {
    const [multiverseActivePage, setMultiverseActivePage] = useState("mainMenu")
    const changeMultiverseActivePage = (activePage) => {
        setMultiverseActivePage(activePage)
    }
    const { user } = useUser("multiverse")
    const [money, setMoney] = useState()
    useEffect(() => {
        if (user) {
            console.log(user.objects)
            let newMoney = user.objects.filter((object) => {
                return object.name === "money"
            })
            setMoney(newMoney[0].value)
        }
    }, [user])
    return (
        <div>
            {multiverseActivePage === "mainMenu" && user &&
                <div>
                    <h1 className={classes.h1}>Welcome {user.name}</h1>
                    <h2 className={classes.h2}>You have {money} pesos</h2>
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