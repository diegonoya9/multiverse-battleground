// Modal.js
import React, { useRef } from 'react';
import classes from './Modal.module.css';

const Modal = ({ onClose, backgroundColor, color, children, styleType }) => {
    const modalRef = useRef();

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };
    // Agregar un event listener para cerrar el modal haciendo clic fuera de él
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className={classes.modalWrapper} style={{ backgroundColor, color }}>
            <div className={classes.modalContainer} style={{ color }} >
                <div className={`${classes.modalContent} ${classes[styleType]}`} style={{ color }} ref={modalRef}>
                    {children}
                </div>
            </div>
        </div>
    );
};


export default Modal;
