import classes from "./ObjectsPage.module.css"
import { useEffect, useState } from "react";

const ObjectsPage = ({ changeMultiverseActivePage }) => {
    const [objects, setObjects] = useState()
    useEffect(() => {
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/gameObjects.json')
            .then((response) => response.json())
            .then((data) => { setObjects(data) })
    }, [])
    return (<div>
        <button value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }} >Back to Main Menu </button>
        <div className={classes.container} >
            {objects &&
                objects.map((object) => {
                    return (
                        <div className={classes.objectContainer} key={object.name}>
                            <span className={classes.objectName}>{object.name}</span>
                            <img alt="fighter" src={object.img} className={classes.objectImg} />
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default ObjectsPage