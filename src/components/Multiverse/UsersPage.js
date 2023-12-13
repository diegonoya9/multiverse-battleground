import classes from "./UsersPage.module.css"
import ReactAudioPlayer from 'react-audio-player';
import { useState, useContext, useEffect } from "react";
import musicFile from "../../assets/sounds/music/DirtyLove.WAV"
import { MyContext } from '../../context/MyContext';
const UsersPage = ({ changeMultiverseActivePage }) => {
    const [users, setUsers] = useState([])
    const audioStyle = {
        display: 'none',
    };
    const { setUserId } = useContext(MyContext);

    const setActiveUser = (id) => {
        setUserId(id)
    }
    useEffect(() => {
        fetch('https://multiverse-battleground-default-rtdb.firebaseio.com/users.json')
            .then((response) => response.json())
            .then((data) => {
                let newData = data.filter((user) => { return user }
                )
                setUsers(newData)
            })
    }, [])
    return (<div>
        <button key="backToMenu" className={classes.backToMainMenuBtn} value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }} >Back to Main Menu </button>
        <div className={classes.container} >
            <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
            {users &&
                users.map((user) => {
                    return (
                        <div className={`${classes.fighterContainer} `} key={user.id} >
                            {user.name}
                            <button type="submit" onClick={() => { setActiveUser(user.userId) }}>Choose user</button>
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default UsersPage