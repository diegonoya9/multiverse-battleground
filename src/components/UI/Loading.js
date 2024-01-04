import classes from './Loading.module.css'

const Loading = () => {
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.loadingDiv}>
                <h1 className={classes.h1}>Loading..</h1>
                <img src="../../assets/img/loading.gif" />
            </div>
        </div>
    )
}

export default Loading