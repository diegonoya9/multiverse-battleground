import classes from './FighterCard.module.css'

const FighterCard = ({ fighter, removeFromParty, addToParty, deleteFighter, setFirstFighter, viewMovements }) => {
    return (
        <div className={`${classes.fighterContainer} ${classes.card}`} key={fighter.id} >
            <div className={` ${classes.imageContainer} ${classes.face} ${classes.front}  ${fighter.active && classes.active}`}>
                <img alt="fighter" src={fighter.imgFront} className={classes.fighterImg} />
                <h3 className={`${classes.fighterName} ${classes.title} `}>{fighter.name}</h3>
                <p className={classes.spanStats}>LEVEL:{fighter.level}</p>
            </div>
            <div className={`${classes.divStats} ${classes.face} ${classes.back}  ${fighter.active && classes.active}`} key={`${fighter.id}stats`}>
                <p className={classes.spanStats}>MAX HP:{fighter.maxHP}</p>
                <p className={classes.spanStats}>CURRENT XP:{fighter.currentXP}</p>
                <p className={classes.spanStats}>ATTACK:{fighter.attack}</p>
                <p className={classes.spanStats}>SPECIAL ATTACK:{fighter.specialAttack}</p>
                <p className={classes.spanStats}>DEFENSE:{fighter.defense}</p>
                <p className={classes.spanStats}>SPECIAL DEFENSE:{fighter.specialDefense}</p>
                <p className={classes.spanStats}>ACCURACY:{fighter.accuracy}</p>
            </div>
        </div >
    )
}

export default FighterCard