import classes from "./ObjectsPage.module.css"
import { memo, useEffect, useState, useContext } from "react";
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/DiscoEterno.WAV"
import Button from "../UI/Button";
import ObjectCard from "../UI/ObjectCard";
import { MyContext } from "../../context/MyContext";
const ObjectsPage = ({ user, changeMultiverseActivePage }) => {
    const [userObjects, setUserObjects] = useState()
    const audioStyle = {
        display: 'none',
    };
    const { userContext } = useContext(MyContext);
    let backEndUrl = userContext.backEndUrl
    useEffect(() => {
        fetch(backEndUrl + '/alluserobjects/' + user.user_id)
            .then((response) => response.json())
            .then((data) => {
                setUserObjects(data)
            })
    }, [])
    return (<div className={classes.backgroundImg}>
        <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
        <div className={classes.container} >
            {userObjects &&
                userObjects.map((object) => {
                    return (
                        object.objects.name !== "Money" &&
                        <div className={classes.objectContainer} key={object.name}>
                            <ObjectCard showPrice={false} object={object}></ObjectCard>
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default memo(ObjectsPage)