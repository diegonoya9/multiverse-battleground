import classes from "./ObjectsPage.module.css"
import { memo, useEffect, useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/DiscoEterno.WAV"
import Button from "../UI/Button";
const ObjectsPage = ({ user, changeMultiverseActivePage }) => {
    const audioStyle = {
        display: 'none',
    };
    return (<div >
        <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
        <div className={classes.container} >
            {user &&
                user.objects.map((object) => {
                    return (
                        <div className={classes.objectContainer} key={object.name}>
                            <span className={classes.objectName}>{object.name}</span>
                            <div className={classes.imageContainer}>
                                <img alt="object" src={object.img} className={classes.objectImg} />
                            </div>
                            <span className={classes.objectName}>Quantity:{object.quantity}</span>
                            <br />
                            <span className={classes.objectName}>Description:{object.description}</span>
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default memo(ObjectsPage)