import classes from './Button.module.css'

const Button = ({ value, onClick, completeWidth, styleType, children }) => {
    return (
        <div onClick={() => onClick()} className={`${classes.button} ${completeWidth && classes.completeWidth} ${classes[styleType]}`}>
            {value}
            {children}
        </div>
    )
}

export default Button