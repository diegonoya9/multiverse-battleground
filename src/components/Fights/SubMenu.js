import classes from './SubMenu.module.css'
import { useState, useEffect } from 'react'
import Modal from '../UI/Modal'
import Button from '../UI/Button'
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
    }, [selectedOption, userFighter.moves, user.objects, user.fighters])
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
                            return x.category === "battleItem" &&
                                <div className={classes.options} >
                                    <Button completeWidth="true" value={`${x.name}:${x.quantity}`} key={x.name + i} styleType={styleType} className={classes.options} onClick={() => { toggleSubMenu(); clickHandler(x, selectedOption); }}><img alt="fighter mini" src={x.img} className={classes.miniImgMenu} /></Button>
                                </div>
                        }
                        )}
                        {optionsArray && selectedOption === "fighters" && optionsArray.map((x, i) => {
                            return x.inParty &&
                                <div className={classes.options} >
                                    <Button completeWidth="true" key={x.name + i} value={x.name} styleType={styleType} onClick={() => { toggleSubMenu(); clickHandler(x, selectedOption); changeFighter(x); }}><img alt="fighter mini" src={x.imgFront} className={classes.miniImgMenu} /></Button>
                                </div>
                        })
                        }
                        {optionsArray && selectedOption === "attacks" && optionsArray.map((x, i) => {
                            return <div className={classes.options}>
                                <Button completeWidth="true" key={x.name + i} styleType={styleType} className={classes.options} onClick={() => { if (x.currentMP > 0) { toggleSubMenu(); clickHandler(x, selectedOption); } }}>{x.name}:{x.currentMP}/{x.MP}</Button>
                            </div>
                        })
                        }
                    </ul>
                </Modal>
            }
        </div >
    )
}
export default SubMenu