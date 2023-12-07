import { useState } from "react";
const Multiverse = ({ changeActivePage }) => {

    return (
        <div>
            <h1>Bienvenido</h1>
            <input type="submit" onClick={(e) => { changeActivePage(2); console.log(e.target.value) }} value={'Fight'} />
            <input type="submit" onClick={(e) => { console.log(e.target.value) }} value={'Fighters'} />
            <input type="submit" onClick={(e) => { console.log(e.target.value) }} value={'Bag'} />
            <input type="submit" onClick={(e) => { console.log(e.target.value) }} value={'Shop'} />
        </div>
    )
}
export default Multiverse