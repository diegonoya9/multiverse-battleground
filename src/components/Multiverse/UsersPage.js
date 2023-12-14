import classes from "./UsersPage.module.css"
import ReactAudioPlayer from 'react-audio-player';
import { useState, useContext, useEffect } from "react";
import musicFile from "../../assets/sounds/music/DirtyLove.WAV"
import Button from "../UI/Button";
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
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
        <div className={classes.container} >
            <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
            {users &&
                users.map((user) => {
                    return (
                        <div className={`${classes.fighterContainer} `} key={user.id} >
                            {user.name}
                            <Button colorType="blue" onClick={() => setActiveUser(user.userId)} value="Choose user"></Button>
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default UsersPage