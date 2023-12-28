import classes from './ActionsList.module.css'
import Action from './Action'
const Actions = ({ inflictedActions, turn }) => {
    return (<div>
        <div className={classes.actionsInflictedUser} >{inflictedActions.map((action) => {
            return ((action.inflicted_on === "user" && turn === "user") || (action.inflicted_on === "enemy" && turn === "enemy"))
                && <Action action={action} ></Action>
        })}</div>
        <div className={classes.actionsInflictedEnemy} >{inflictedActions.map((action) => {
            return ((action.inflicted_on === "enemy" && turn === "user") || (action.inflicted_on === "user" && turn === "enemy"))
                && <Action action={action} ></Action>
        })}</div>
    </div>)
}

export default Actions