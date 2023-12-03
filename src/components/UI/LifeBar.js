import classes from './LifeBar.module.css'

const LifeBar = ({ currentHP, maxHP }) => {
    return (
        <div className={classes.lifeBarContainer}>
            <div className={classes.hp}>{`${currentHP} / ${maxHP}`}</div>
            <div className={classes.lifeBarBorder}>
                <div className={classes.lifeBar} style={{ width: `${(currentHP * 100) / maxHP}%` }}>
                </div>
            </div>
        </div>
    )
}

export default LifeBar