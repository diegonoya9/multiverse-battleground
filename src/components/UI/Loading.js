import classes from './Loading.module.css'
import { useTranslation } from 'react-i18next'
const Loading = () => {
    const { t } = useTranslation();
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.loadingDiv}>
                <h1 className={classes.h1}>{t("loading.loading")}</h1>
                <img alt="loadingImg" src="../../assets/img/loading.gif" />
            </div>
        </div>
    )
}

export default Loading