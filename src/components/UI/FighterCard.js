import classes from './FighterCard.module.css'
const FighterCard = ({ fighter, showPrice }) => {
    return (
        <div className={`${classes.fighterContainer} ${classes.card} `} key={fighter.id} >
            <div className={` ${classes.imageContainer} ${classes.face} ${classes.front}  ${fighter.active === "true" && classes.active}`}>
                {showPrice && <p className={`${classes.fighterPrice}  ${classes.title} ${"fighterPriceBlock"} `} >Price: {fighter.price}</p>}
                <img alt="fighter" src={fighter.img_front} className={classes.fighterImg} />
                <h3 className={`${classes.fighterName} ${classes.title} `}>{fighter.name}</h3>
                <h2 className={classes.spanStats}>LEVEL:{fighter.level}</h2>
            </div>
            <div className={`${classes.divStats} ${classes.face} ${classes.back}  ${fighter.active === "true" && classes.active}`} key={`${fighter.id}stats`}>
                <p className={classes.spanStats}>MAX HP:{fighter.max_hp}</p>
                <p className={classes.spanStats}>CURRENT XP:{fighter.current_xp}</p>
                <p className={classes.spanStats}>ATTACK:{fighter.attack}</p>
                <p className={classes.spanStats}>SPECIAL ATTACK:{fighter.special_attack}</p>
                <p className={classes.spanStats}>DEFENSE:{fighter.defense}</p>
                <p className={classes.spanStats}>SPECIAL DEFENSE:{fighter.special_defense}</p>
                <p className={classes.spanStats}>ACCURACY:{fighter.accuracy}</p>
            </div>
        </div >
    )
}

export default FighterCard