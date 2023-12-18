import classes from './LifeBar.module.css'

const LifeBar = ({ styleType, fighter }) => {
    return (
        <div className={classes.lifeBarContainer}>
            <div className={`${classes.hp} ${classes[styleType]}`}>{`${fighter.name}  Lvl:${fighter.level}  HP: ${fighter.currentHP} / ${fighter.maxHP}`}</div>
            <div className={classes.lifeBarBorder}>
                <div className={classes.lifeBar} style={{ width: `${(fighter.currentHP * 100) / fighter.maxHP}%` }}>
                </div>
            </div>
        </div>
    )
}

export default LifeBar