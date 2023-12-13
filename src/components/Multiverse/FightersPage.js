import classes from "./FightersPage.module.css"
import ReactAudioPlayer from 'react-audio-player';
import musicFile from "../../assets/sounds/music/DirtyLove.WAV"
const FightersPage = ({ user, changeMultiverseActivePage }) => {
    return (<div>
        <button className={classes.backToMainMenuBtn} value="Back to Main Menu" onClick={() => { changeMultiverseActivePage("mainMenu") }} >Back to Main Menu </button>
        <div className={classes.container} >
            {user &&
                user.fighters.map((fighter) => {
                    return (
                        <div className={classes.fighterContainer} key={fighter.id}>
                            <ReactAudioPlayer src={musicFile} autoPlay controls style={audioStyle} />
                            <span className={classes.fighterName}>{fighter.name}</span>
                            <div className={classes.imageContainer}>
                                <img alt="fighter" src={fighter.imgFront} className={classes.fighterImg} />
                            </div>
                            <div className={classes.divStats} key={`${fighter.id}stats`}>
                                <span className={classes.spanStats}>LEVEL:{fighter.level}</span>
                                <span className={classes.spanStats}>MAX HP:{fighter.maxHP}</span>
                                <span className={classes.spanStats}>CURRENT XP:{fighter.currentXP}</span>
                                <span className={classes.spanStats}>ATTACK:{fighter.attack}</span>
                                <span className={classes.spanStats}>SPECIAL ATTACK:{fighter.specialAttack}</span>
                                <span className={classes.spanStats}>DEFENSE:{fighter.defense}</span>
                                <span className={classes.spanStats}>SPECIAL DEFENSE:{fighter.specialDefense}</span>
                                <span className={classes.spanStats}>ACCURACY:{fighter.accuracy}</span>
                                <button type="submit">Agregar a la partida</button >
                                <button type="submit">Primer turno</button>
                            </div>
                        </div>
                    );
                })}
        </div>
    </div>
    );

}

export default FightersPage