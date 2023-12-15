import classes from './Button.module.css'

const Button = ({ value, colorType, onClick }) => {
    return (
        <div className={classes.buttonImg} >
            <input className={`${classes.button} ${classes[colorType]} `} onClick={() => onClick()} value={value} type="button"></input>
        </div>
    )
}

export default Button