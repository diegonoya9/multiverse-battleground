import classes from "./MissionsPage.module.css"
import { memo, useEffect, useState, useContext } from "react";
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/DiscoEterno.WAV"
import Button from "../UI/Button";
import { MyContext } from "../../context/MyContext";
const MissionsPage = ({ changeActivePage,user, changeMultiverseActivePage }) => {
    const [missions, setMissions] = useState()
    const audioStyle = {
        display: 'none',
    };
    const { userContext, setCurrentMission,setCurrentLevel } = useContext(MyContext);
    let backEndUrl = userContext.backEndUrl
    let bg = userContext.bg
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (backEndUrl ) {
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
        changeActivePage(2)
    }
    return (<div className={classes.backgroundImg}>
        <ReactAudioPlayer src={musicFile} volume={bg/100} autoPlay controls style={audioStyle} />
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
        <div className={classes.container} >
            {missions &&
                missions.map((mission) => {
                    return (
                        <div className={classes.missionContainer} key={mission.mission_id}>
                            {mission.description}
                            <Button value="Start Mission" onClick={() => {startMission(mission)}}></Button>
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default memo(MissionsPage)