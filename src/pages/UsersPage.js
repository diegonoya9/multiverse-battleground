import classes from "./UsersPage.module.css"
import { useState, useContext, useEffect } from "react";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import { MyContext } from '../context/MyContext';
import { useNavigate } from "react-router-dom";
const UsersPage = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const { userContext, setUserId } = useContext(MyContext);
    let backEndUrl = userContext.backEndUrl
    const setActiveUser = (id) => {
        setUserId(id)
        setShowModal(true)
    }

    const [showModal, setShowModal] = useState(false)
    const closeModal = () => {
        setShowModal(false)
    }
    useEffect(() => {
        fetch(backEndUrl + '/allusers')
            .then((response) => response.json())
            .then((data) => {
                let newData = data.filter((user) => { return user }
                )
                setUsers(newData)
            })
    }, [backEndUrl])
    return (<div>
        {showModal && <Modal onClose={closeModal} backgroundColor="lightblue" color="white">
            <h1 style={{ color: 'white' }}>Player selected</h1>
        </Modal>}
        <Button colorType="lightgreen" value="Back to Main Menu" onClick={() => { navigate('/') }}></Button>
        <div className={classes.container} >
            {users &&
                users.map((user) => {
                    return (
                        <div className={`${classes.fighterContainer} `} key={user.userId} >
                            {user.name}
                            <Button colorType="blue" onClick={() => setActiveUser(user.user_id)} value="Choose user"></Button>
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default UsersPage