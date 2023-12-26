import classes from './Action.module.css'
import { useState } from 'react'
const Action = ({ action }) => {
    const actionIdentifier = {
        "current_hp": "/assets/img/HP.png",
        "defense": '/assets/img/defense.png',
        "special_defense": '/assets/img/specialDefense.png',
        "attack": '/assets/img/attack.png',
        "special_attack": '/assets/img/specialAttack.png',
        "accuracy": "/assets/img/accuracy.png"
    }
    return (
        <div className={`${classes.action} ${action.value > 0 ? classes.positive : classes.negative}`}>
            <img className={classes.img} src={actionIdentifier[action.field]}></img>{action.value}
        </div>
    )
}

export default Action