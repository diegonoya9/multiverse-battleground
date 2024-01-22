import React, { useRef, useEffect } from 'react';
import classes from './Modal.module.css';

const Modal = ({ onClose, backgroundColor, color, children, styleType }) => {
    const modalRef = useRef();
    // Bloquear el scroll cuando se monta el modal
    useEffect(() => {
        let root = document.getElementById("root")
        let originalHeight
        let originalOverflow
        if (root){
            originalOverflow = root.style.overflow;
            originalHeight = root.style.height;
    
            // Bloquear el scroll al montar el modal
            root.style.overflow = 'hidden';
            root.style.height = '100vh';
    
            // Desbloquear el scroll al desmontar el modal
            return () => {
                root.style.overflow = originalOverflow;
                root.style.height = originalHeight;
            };
        }
    }, []);

    // Agregar un event listener para cerrar el modal haciendo clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className={classes.modalWrapper} style={{ backgroundColor, color }}>
            <div className={classes.modalContainer} style={{ color }}>
                <div className={`${classes.modalContent} ${classes[styleType]}`} style={{ color }} ref={modalRef}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
