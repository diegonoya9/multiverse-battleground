import classes from "./ObjectsPage.module.css"
import { memo, useEffect, useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/DiscoEterno.WAV"
import Button from "../UI/Button";
import ObjectCard from "../UI/ObjectCard";
const ObjectsPage = ({ user, changeMultiverseActivePage }) => {
    const audioStyle = {
        display: 'none',
    };
    return (<div className={classes.backgroundImg}>
        <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
        <div className={classes.container} >
            {user &&
                user.objects.map((object) => {
                    return (
                        object.name !== "money" &&
                        <div className={classes.objectContainer} key={object.name}>
                            <ObjectCard object={object}></ObjectCard>
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default memo(ObjectsPage)