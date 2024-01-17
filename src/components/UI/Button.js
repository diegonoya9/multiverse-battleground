import classes from './Button.module.css'
import ReactAudioPlayer from 'react-audio-player';
import { MyContext } from '../../context/MyContext';
import { useContext } from 'react';
const Button = ({ value, onClick, completeWidth, styleType, children }) => {
    const { userContext } = useContext(MyContext)
    const sound = userContext.sound
    const audioStyle = {
        display: 'none', // Oculta el reproductor de audio visualmente
    };
    const handleButtonClick = () => {
        const audio = document.getElementById('audioPlayer');
        if (audio) {
            audio.play()
        }
        onClick()
    }
    return (
        <div onClick={() => handleButtonClick()} className={`${classes.button} ${completeWidth && classes.completeWidth} ${classes[styleType]}`}>
            <ReactAudioPlayer src='/assets/sounds/UI/buttonClick.mp3' volume={sound / 100} id="audioPlayer" controls style={audioStyle} />
            {value}
            {children}
        </div>
    )
}

export default Button