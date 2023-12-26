import classes from './ObjectCard.module.css'
const ObjectCard = ({ object, showPrice }) => {
    return (
        <div className={classes.card} key={object.id} >
            <div className={` ${classes.face} ${classes.front}`}>
                {showPrice && <p className={classes.spanStats}>Price:{object.price}</p>}
                <img alt="object" src={object.objects.img} className={classes.objectImg} />
                <h3 className={`${classes.objectName} ${classes.title} `}>{object.name}</h3>
                <h2 className={classes.spanStats}>Quantity:{object.quantity}</h2>
            </div>
            <div className={`${classes.divStats} ${classes.face} ${classes.back}  ${object.active && classes.active}`} key={`${object.id}stats`}>
                <span className={classes.spanStats}>Description:{object.description}</span>
            </div>
        </div >
    )
}

export default ObjectCard