import classes from './Fighter.module.css'
import LifeBar from './LifeBar'


const Fighter = ({ children, user, fighter, styleType }) => {
    return (
        <div className={`${classes.fullContainer} ${user === "user" ? classes.userFighterWrapper : classes.enemyFighterWrapper}`}>
            <div className={`${classes[styleType]} ${classes.headerContainer} ${user === "user" ? classes.userHeader : classes.enemyHeader}`}>
                <h3 className={`${classes[styleType + 'h3']} ${classes.hp}`} >{fighter.name}/LVL:{fighter.level}</h3>
                <LifeBar styleType={styleType} currentHP={fighter.currentHP} maxHP={fighter.maxHP}></LifeBar>
            </div>
            <div className={`${classes.sombra} ${classes.fighterWrapper}`}>
                <div className={user === "user" ? classes.userFighter : classes.enemyFighter}>
                    {children}
                    <img alt="fighter" src={user === "user" ? `${fighter.imgBack}` : `${fighter.imgFront}`} className={classes.fighterImage} />
                    <div className={classes.fighterShadow}>Shadow</div>
                </div>
            </div >
        </div>
    )
}

export default Fighter