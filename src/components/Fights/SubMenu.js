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

    return (
        <div className={classes.divSubMenu}>
            {showModal
                &&
                <Modal styleType={styleType} color="white" backgroundColor="white" onClose={closeModal}>
                    <ul className={classes.optionsContainer} >
                        {optionsArray && selectedOption === "objects" && optionsArray.map((x, i) => {
                            return x.category === "battleItem" &&
                                <div key={x.name} className={classes.options} >
                                    <Button completeWidth="true" value={`${x.name}:${x.quantity}`} key={x.name + i} styleType={styleType} className={classes.options} onClick={() => { toggleSubMenu(); clickHandler(x, selectedOption); }}><img alt="fighter mini" src={x.img} className={classes.miniImgMenu} /></Button>
                                </div>
                        }
                        )}
                        {optionsArray && selectedOption === "fighters" && optionsArray.map((fighter, i) => {
                            return fighter.inParty && fighter.currentHP > 0 &&
                                <div key={fighter.userFighterId} className={classes.options} >
                                    <Button completeWidth="true" key={fighter.name + i} value={fighter.name} styleType={styleType} onClick={() => { toggleSubMenu(); clickHandler(fighter, selectedOption); changeUserFighter(fighter); }}><img alt="fighter mini" src={fighter.imgFront} className={classes.miniImgMenu} /></Button>
                                </div>
                        })
                        }
                        {optionsArray && selectedOption === "attacks" && optionsArray.map((x, i) => {
                            return <div key={x.name} className={classes.options}>
                                <Button completeWidth="true" key={x.name + i} styleType={styleType} className={classes.options} onClick={() => { if (x.currentMP > 0) { toggleSubMenu(); clickHandler(x, selectedOption); } }}>{x.moves.name}:{x.currentMP}/{x.moves.mp}</Button>
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