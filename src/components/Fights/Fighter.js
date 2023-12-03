import classes from './Fighter.module.css'
import LifeBar from '../UI/LifeBar'

const Fighter = ({ user, fighter }) => {
    return (
        <div className={user === "user" ? `${classes.userFighterWrapper} ${classes.fighterWrapper}` : `${classes.enemyFighterWrapper} ${classes.fighterWrapper}`}>
            <LifeBar currentHP={fighter.currentHP} maxHP={fighter.maxHP}></LifeBar>
            <div className={user === "user" ? classes.userFighter : classes.enemyFighter}>
                <img src={user === "user" ? './assets/img/goku.png' : './assets/img/pokemon.png'} className={classes.fighterImage} />
            </div>
        </div>
    )
}

export default Fighter