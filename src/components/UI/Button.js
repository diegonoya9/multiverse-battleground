import classes from './Button.module.css'

const Button = ({ value, colorType, onClick, completeWidth }) => {
    return (
        <input className={`${classes.button} ${completeWidth && classes.completeWidth}`} onClick={() => onClick()} value={value} type="button"></input>
    )
}

export default Button