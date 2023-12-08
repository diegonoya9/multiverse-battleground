import classes from "./FightersPage.module.css"

const FightersPage = ({ user }) => {
    console.log(user)
    return (
        <div className={classes.container}>
            {user &&
                user.fighters.map((fighter) => {
                    return (
                        <div className={classes.fighterContainer} key={fighter.id}>
                            <span className={classes.fighterName}>{fighter.name}</span>
                            <img alt="fighter" src={fighter.imgFront} className={classes.fighterImg} />
                        </div>
                    );
                })}
        </div>
    );

}

export default FightersPage