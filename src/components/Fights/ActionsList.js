import classes from './ActionsList.module.css'
import Action from './Action'
const Actions = ({ inflictedActions, turn }) => {
    return (<div>
        <div key={Math.random()} className={classes.actionsInflictedUser} >{inflictedActions.map((action) => {
            return ((action.inflicted_on === "user" && turn === "user") || (action.inflicted_on === "enemy" && turn === "enemy"))
                && <Action key={action.action_id} action={action} ></Action>
        })}</div>
        <div key={Math.random()} className={classes.actionsInflictedEnemy} >{inflictedActions.map((action) => {
            return ((action.inflicted_on === "enemy" && turn === "user") || (action.inflicted_on === "user" && turn === "enemy"))
                && <Action key={action.action_id} action={action} ></Action>
        })}</div>
    </div>)
}

export default Actions