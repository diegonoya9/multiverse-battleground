import classes from './FighterCard.module.css'
import { useTranslation } from 'react-i18next';
const FighterCard = ({ fighter, showPrice }) => {
    const { t } = useTranslation();
    return (
        <div className={`${classes.fighterContainer} ${classes.card} `} key={fighter.id} >
            <div className={` ${classes.imageContainer} ${classes.face} ${classes.front}  ${fighter.active === "true" && classes.active}`}>
                {showPrice && <p className={`${classes.fighterPrice}  ${classes.title} ${"fighterPriceBlock"} `} >{t('fightercard.price')}: {fighter.price}</p>}
                <img alt="fighter" src={fighter.img_front} className={classes.fighterImg} />
                <h3 className={`${classes.fighterName} ${classes.title} `}>{fighter.name}</h3>
                <h2 className={classes.spanStats}>{t('fightercard.level')}:{fighter.level}</h2>
            </div>
            <div className={`${classes.divStats} ${classes.face} ${classes.back}  ${fighter.active === "true" && classes.active}`} key={`${fighter.id}stats`}>
                <p className={classes.spanStats}>{t('fightercard.hp')}:{fighter.max_hp}</p>
                <p className={classes.spanStats}>{t('fightercard.attack')}:{fighter.attack}</p>
                <p className={classes.spanStats}>{t('fightercard.specialAttack')}:{fighter.special_attack}</p>
                <p className={classes.spanStats}>{t('fightercard.defense')}:{fighter.defense}</p>
                <p className={classes.spanStats}>{t('fightercard.specialDefense')}:{fighter.special_defense}</p>
                <p className={classes.spanStats}>{t('fightercard.accuracy')}:{fighter.accuracy}</p>
            </div>
        </div >
    )
}

export default FighterCard