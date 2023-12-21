import classes from './ActionsList.module.css'
import Action from './Action'
const Actions = ({ inflictedActions, turn }) => {
    return (<div>
        <div className={classes.actionsInflictedUser} >{inflictedActions.map((action) => {
            return ((action.inflictedOn === "user" && turn === "user") || (action.inflictedOn === "enemy" && turn === "enemy"))
                && <Action action={action} ></Action>
        })}</div>
        <div className={classes.actionsInflictedEnemy} >{inflictedActions.map((action) => {
            return ((action.inflictedOn === "enemy" && turn === "user") || (action.inflictedOn === "user" && turn === "enemy"))
                && <Action action={action} ></Action>
        })}</div>
    </div>)
}

export default Actions