import classes from "./MissionsPage.module.css"
import { memo, useEffect, useState, useContext } from "react";
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/DiscoEterno.WAV"
import Button from "../UI/Button";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
const MissionsPage = () => {
    const navigate = useNavigate()
    const [missions, setMissions] = useState()
    const audioStyle = {
        display: 'none',
    };
    const { userContext, setCurrentMission, setCurrentLevel } = useContext(MyContext);
    let backEndUrl = userContext.backEndUrl
    let bg = userContext.bg
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (backEndUrl) {
                    const response = await fetch(backEndUrl + '/allmissions/');
                    const data = await response.json();
                    setMissions(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [backEndUrl])
    const startMission = (mission) => {
        setCurrentLevel(1)
        setCurrentMission(mission)
        navigate('/battle')
    }
    const handleAudioEnd = (e) => {
        // Reiniciar la reproducción cuando la canción termine
        e.target.play();
    };
    return (<div className={classes.backgroundImg}>
        <ReactAudioPlayer onEnded={handleAudioEnd} src={musicFile} volume={bg / 100} autoPlay controls style={audioStyle} />
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { navigate('/') }}></Button>
        <div className={classes.container} >
            {missions &&
                missions.map((mission) => {
                    return (
                        <div className={classes.missionContainer} key={mission.mission_id}>
                            {mission.description}
                            <Button value="Start Mission" onClick={() => { startMission(mission) }}></Button>
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default memo(MissionsPage)