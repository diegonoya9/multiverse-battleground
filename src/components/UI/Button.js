import classes from './Button.module.css'

const Button = ({ value, colorType, onClick }) => {
    return (
        <input className={`${classes.button} ${classes[colorType]} `} onClick={() => onClick()} value={value} type="button"></input>
    )
}

export default Button