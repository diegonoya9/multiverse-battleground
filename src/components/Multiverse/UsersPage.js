import classes from "./UsersPage.module.css"
import ReactAudioPlayer from 'react-audio-player';
import { useState, useContext, useEffect } from "react";
import musicFile from "../../assets/sounds/music/DirtyLove.WAV"
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { MyContext } from '../../context/MyContext';
const UsersPage = ({ changeMultiverseActivePage }) => {
    const [users, setUsers] = useState([])
    const audioStyle = {
        display: 'none',
    };
    const { setUserId } = useContext(MyContext);

    const setActiveUser = (id) => {
        setUserId(id)
        setShowModal(true)
    }

    const [showModal, setShowModal] = useState(false)
    const closeModal = () => {
        setShowModal(false)
    }
    useEffect(() => {
        fetch('https://graceful-capris-deer.cyclic.app/api/allusers')
            .then((response) => response.json())
            .then((data) => {
                let newData = data.filter((user) => { return user }
                )
                setUsers(newData)
            })
    }, [])
    return (<div>
        {showModal && <Modal onClose={closeModal} backgroundColor="lightblue" color="white">
            <h1 style={{ color: 'white' }}>Player selected</h1>
        </Modal>}
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }}></Button>
        <div className={classes.container} >
            <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
            {users &&
                users.map((user) => {
                    return (
                        <div className={`${classes.fighterContainer} `} key={user.userId} >
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