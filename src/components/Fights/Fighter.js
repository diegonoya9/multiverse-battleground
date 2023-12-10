import classes from './Fighter.module.css'
import LifeBar from '../UI/LifeBar'


const Fighter = ({ user, fighter }) => {
    return (
        <div className={user === "user" ? `${classes.userFighterWrapper} ${classes.fighterWrapper}` : `${classes.enemyFighterWrapper} ${classes.fighterWrapper}`}>
            <h3 style={{ color: "white" }}>{fighter.name}/LVL:{fighter.level}</h3>
            <LifeBar currentHP={fighter.currentHP} maxHP={fighter.maxHP}></LifeBar>
            <div className={user === "user" ? classes.userFighter : classes.enemyFighter}>
                <img alt="fighter" src={user === "user" ? `${fighter.imgBack}` : `${fighter.imgFront}`} className={classes.fighterImage} />
            </div>
        </div >
    )
}

export default Fighter