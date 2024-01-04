import classes from "./ObjectsPage.module.css"
import { memo, useEffect, useState, useContext } from "react";
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/DiscoEterno.WAV"
import Button from "../UI/Button";
import ObjectCard from "../UI/ObjectCard";
import { MyContext } from "../../context/MyContext";
import { act } from 'react-dom/test-utils';
const ObjectsPage = ({ user, changeMultiverseActivePage }) => {
    const [userObjects, setUserObjects] = useState()
    const audioStyle = {
        display: 'none',
    };
    const { userContext } = useContext(MyContext);
    let backEndUrl = userContext.backEndUrl
    let bg = userContext.bg
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (backEndUrl && user) {
                    const response = await fetch(backEndUrl + '/alluserobjects/' + user.user_id);
                    const data = await response.json();
                    act(() => {
                        setUserObjects(data);
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [backEndUrl, user.user_id])
    return (<div className={classes.backgroundImg}>
        <ReactAudioPlayer src={musicFile} volume={bg/100} autoPlay controls style={audioStyle} />
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