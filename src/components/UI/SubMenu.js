import classes from './SubMenu.module.css'
import { useState, useEffect } from 'react'
import Modal from './Modal'
const SubMenu = ({ user, clickHandler, toggleSubMenu, selectedOption, userFighter, changeUserFighter, styleType }) => {
    const [optionsArray, setOptionsArray] = useState()
    const [showModal, setShowModal] = useState(true)
    useEffect(() => {
        switch (selectedOption) {
            case "attacks":
                let moves = userFighter.moves
                setOptionsArray(moves)
                break
            case "objects":
                setOptionsArray(user.objects)
                break
            case "fighters":
                setOptionsArray(user.fighters)
                break
            default: break
        }
    }, [selectedOption])
    const closeModal = () => {
        setShowModal(false)
        toggleSubMenu()
    }
    const changeFighter = (element) => {
        changeUserFighter((prevState) => {
            prevState.active = false;
            element.active = true;
            return (element)
        })
        userFighter = element
        return element
    }
    return (
        <div className={classes.divSubMenu}>
            {showModal
                &&
                <Modal styleType={styleType} color="white" backgroundColor="white" onClose={closeModal}>
                    <ul className={classes.optionsContainer} >
                        {optionsArray && selectedOption === "objects" && optionsArray.map((x, i) => {
                            return x.category === "battleItem" && <li key={x.name + i} className={`${classes.options} ${classes[styleType]}`} onClick={() => { toggleSubMenu(); clickHandler(x, selectedOption); }}>{x.name}:{x.quantity}<img alt="fighter mini" src={x.img} className={classes.miniImgMenu} /></li>
                        }
                        )}
                        {optionsArray && selectedOption === "fighters" && optionsArray.map((x, i) => { return x.inParty && <li key={x.name + i} className={`${classes.options} ${classes[styleType]}`} onClick={() => { toggleSubMenu(); clickHandler(x, selectedOption); changeFighter(x); }}>{x.name}<img alt="fighter mini" src={x.imgFront} className={classes.miniImgMenu} /></li> })}
                        {optionsArray && selectedOption === "attacks" && optionsArray.map((x, i) => { return <li key={x.name + i} className={`${classes.options} ${classes[styleType]}`} onClick={() => { if (x.currentMP > 0) { toggleSubMenu(); clickHandler(x, selectedOption); } }}>{x.name}:{x.currentMP}/{x.MP}</li> })}
                    </ul>
                </Modal>
            }
        </div >
    )
}
export default SubMenu