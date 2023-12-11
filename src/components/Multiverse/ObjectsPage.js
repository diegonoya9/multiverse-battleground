import classes from "./ObjectsPage.module.css"
import { memo, useEffect, useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/DiscoEterno.WAV"
const ObjectsPage = ({ user, changeMultiverseActivePage }) => {
    const audioStyle = {
        display: 'none',
    };
    return (<div>
        <ReactAudioPlayer src={musicFile} /*autoPlay*/ controls style={audioStyle} />
        <button value="Back to Main Menu" className={classes.backToMainMenuBtn} onClick={() => { changeMultiverseActivePage("mainMenu") }} >Back to Main Menu </button>
        <div className={classes.container} >
            {user &&
                user.objects.map((object) => {
                    return (
                        <div className={classes.objectContainer} key={object.name}>
                            <span className={classes.objectName}>{object.name}</span>
                            <div className={classes.imageContainer}>
                                <img alt="fighter" src={object.img} className={classes.objectImg} />
                            </div>
                            <span className={classes.objectName}>Quantity:{object.quantity}</span>
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default memo(ObjectsPage)