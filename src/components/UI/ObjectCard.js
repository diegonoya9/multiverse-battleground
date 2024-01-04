import classes from './ObjectCard.module.css'
import { useTranslation } from 'react-i18next';
const ObjectCard = ({ object, showPrice }) => {
    const { t } = useTranslation();
    return (
        <div className={classes.card} key={object.id} >
            <div className={` ${classes.face} ${classes.front}`}>
                {showPrice && <p className={classes.spanStats}>{t('objectscard.price')}:{object.price}</p>}
                <img alt="object" src={object.img} className={classes.objectImg} />
                <h3 className={`${classes.objectName} ${classes.title} `}>{object.name}</h3>
                <h2 className={classes.spanStats}>{t('objectscard.quantity')}:{object.quantity}</h2>
            </div>
            <div className={`${classes.divStats} ${classes.face} ${classes.back}  ${object.active === "true" && classes.active}`} key={`${object.id}stats`}>
                <span className={classes.spanStats}>{t('objectscard.description')}:{object.description}</span>
            </div>
        </div >
    )
}

export default ObjectCard