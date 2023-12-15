import classes from './Button.module.css'

const Button = ({ value, colorType, onClick, completeWidth, styleType }) => {
    return (
        <input className={`${classes.button} ${completeWidth && classes.completeWidth} ${classes[styleType]}`} onClick={() => onClick()} value={value} type="button"></input>
    )
}

export default Button