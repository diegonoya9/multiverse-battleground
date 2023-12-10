// En tu componente
import React from 'react';
import classes from './FightModal.module.css'; // Asegúrate de importar tu archivo de estilos correctamente

const FightModal = ({ onStartAdventure }) => {
    return (
        <div className={classes.modalWrapper}>
            <div className={classes.modalContainer}>
                <div className={classes.modalContent}>
                    <h1 style={{ color: '#ff4500' }}>Welcome to the Multiverse Battleground</h1>
                    <p style={{ color: '#fff' }}>Get ready for epic battles!</p>
                    <button className={classes.modalButton} onClick={onStartAdventure}>
                        Start Adventure!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FightModal;
