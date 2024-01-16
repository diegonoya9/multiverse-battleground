import classes from './Action.module.css'
const Action = ({ action }) => {
    const actionIdentifier = {
        "current_hp": "/assets/img/HP.png",
        "extra_defense": '/assets/img/defense.png',
        "defense": '/assets/img/defense.png',
        "extra_special_defense": '/assets/img/specialDefense.png',
        "special_defense": '/assets/img/specialDefense.png',
        "extra_attack": '/assets/img/attack.png',
        "attack": '/assets/img/attack.png',
        "extra_special_attack": '/assets/img/specialAttack.png',
        "special_attack": '/assets/img/specialAttack.png',
        "extra_accuracy": "/assets/img/accuracy.png",
        "accuracy": "/assets/img/accuracy.png"
    }
    return (
        <div className={`${classes.action} ${action.value > 0 ? classes.positive : classes.negative}`}>
            <img className={classes.img} src={actionIdentifier[action.field]}></img>{action.value}
        </div>
    )
}

export default Action