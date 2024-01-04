// Modal.js
import React, { useRef } from 'react';
import classes from './Modal.module.css';

const Modal = ({ onClose, backgroundColor, color, children, styleType }) => {
    const modalRef = useRef();

    // Agregar un event listener para cerrar el modal haciendo clic fuera de él
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
                console.log(modalRef.current.contains(event.target))
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

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
