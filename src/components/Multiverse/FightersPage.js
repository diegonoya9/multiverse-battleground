import classes from "./FightersPage.module.css"

const FightersPage = ({ user, changeMultiverseActivePage }) => {
    return (<div>
        <button value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }} >Back to Main Menu </button>
        <div className={classes.container}>
            {user &&
                user.fighters.map((fighter) => {
                    return (
                        <div className={classes.fighterContainer} key={fighter.id}>
                            <span className={classes.fighterName}>{fighter.name}</span>
                            <img alt="fighter" src={fighter.imgFront} className={classes.fighterImg} />
                            <div className={classes.divStats} >
                                <span className={classes.spanStats}>LEVEL:{fighter.level}</span>
                                <span className={classes.spanStats}>MAX HP:{fighter.maxHP}</span>
                                <span className={classes.spanStats}>CURRENT XP:{fighter.currentXP}</span>
                                <span className={classes.spanStats}>ATTACK:{fighter.attack}</span>
                                <span className={classes.spanStats}>SPECIAL ATTACK:{fighter.specialAttack}</span>
                                <span className={classes.spanStats}>DEFENSE:{fighter.defense}</span>
                                <span className={classes.spanStats}>SPECIAL DEFENSE:{fighter.specialDefense}</span>
                                <span className={classes.spanStats}>ACCURACY:{fighter.accuracy}</span>
                            </div>
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default FightersPage