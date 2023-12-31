import classes from './LifeBar.module.css'

const LifeBar = ({ styleType, fighter }) => {
    return (
        <div className={classes.lifeBarContainer}>
            <div className={`${classes.hp} ${classes[styleType]}`}>{`${fighter.name}  Lvl:${fighter.level}  HP: ${fighter.current_hp} / ${fighter.max_hp}`}</div>
            <div className={classes.lifeBarBorder}>
                <div className={classes.lifeBar} style={{ width: `${(fighter.current_hp * 100) / fighter.max_hp}%` }}>
                </div>
            </div>
        </div>
    )
}

export default LifeBar