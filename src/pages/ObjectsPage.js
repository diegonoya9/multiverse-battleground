import classes from "./ObjectsPage.module.css"
import { memo, useEffect, useState, useContext } from "react";
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../assets/sounds/music/DiscoEterno.WAV"
import Button from "../components/UI/Button";
import ObjectCard from "../components/UI/ObjectCard";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
const ObjectsPage = () => {
    const navigate = useNavigate()
    const [userObjects, setUserObjects] = useState()
    const audioStyle = {
        display: 'none',
    };
    const { userContext } = useContext(MyContext);
    let backEndUrl = userContext.backEndUrl
    let user = userContext.user
    let bg = userContext.bg
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (backEndUrl && user) {
                    const response = await fetch(backEndUrl + '/alluserobjects/' + user.user_id);
                    const data = await response.json();
                    setUserObjects(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [backEndUrl, user.user_id])
    const handleAudioEnd = (e) => {
        // Reiniciar la reproducción cuando la canción termine
        e.target.play();
    };
    return (<div className={classes.backgroundImg}>
        <ReactAudioPlayer onEnded={handleAudioEnd} src={musicFile} volume={bg / 100} autoPlay controls style={audioStyle} />
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { navigate('/') }}></Button>
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