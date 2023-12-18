import classes from './Fighter.module.css'
import LifeBar from './LifeBar'


const Fighter = ({ turn, children, user, fighter, styleType, userAttacked, attack }) => {
    return (
        <div className={`${classes.fullContainer} ${userAttacked === "user" && user === "user" ? classes.userAttack : userAttacked === "enemy" && user === "enemy" && classes.enemyAttack} ${((turn === "user" && user === "user") || (turn !== "user" && user !== "user")) ? classes.active : classes.notActive} ${user === "user" ? classes.userFighterWrapper : classes.enemyFighterWrapper}`}>
            {/* descomentar si queremos la barra de vida arriba del luchador } <div className={`${classes[styleType]} ${classes.headerContainer} ${user === "user" ? classes.userHeader : classes.enemyHeader}`}>
                <h3 className={`${classes[styleType + 'h3']} ${classes.hp}`} >{fighter.name}/LVL:{fighter.level}</h3>
                <LifeBar styleType={styleType} currentHP={fighter.currentHP} maxHP={fighter.maxHP}></LifeBar>
    </div>*/}
            {userAttacked && ((userAttacked === "userPowerUp" && user === "user") || (userAttacked === "enemyPowerUp" && user === "enemy")) && <img alt="userPowerUp" className={classes.userPowerUp} src={attack && attack.src} />}
            <div className={`${classes.sombra} ${classes.fighterWrapper} `}>
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