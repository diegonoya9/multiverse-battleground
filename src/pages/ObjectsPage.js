import classes from "./ObjectsPage.module.css"
import { memo, useEffect, useState, useContext } from "react";
import Button from "../components/UI/Button";
import ObjectCard from "../components/UI/ObjectCard";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
const ObjectsPage = () => {
    const navigate = useNavigate()
    const [userObjects, setUserObjects] = useState()
    const { userContext } = useContext(MyContext);
    let backEndUrl = userContext.backEndUrl
    let user = userContext.user
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
    }, [backEndUrl, user])
    return (<div className={classes.backgroundImg}>
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