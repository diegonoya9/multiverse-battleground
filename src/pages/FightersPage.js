import classes from "./FightersPage.module.css"
import Modal from "../components/UI/Modal";
import { useState, useContext, useEffect, useCallback } from "react";
import Button from "../components/UI/Button";
import { MyContext } from "../context/MyContext";
import FighterCard from "../components/UI/FighterCard";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
const FightersPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState()
    const [selectMoves, setSelectMoves] = useState(false)
    const { userContext } = useContext(MyContext);
    const [fighters, setFighters] = useState()
    const [moves, setMoves] = useState()
    const [allowCloseModal, setAllowCloseModal] = useState(true)
    let user = userContext.user
    let backEndUrl = userContext.backEndUrl
    let activeUser = userContext.idUsuario
    let bg = userContext.bg
    const closeModal = () => {
        if (allowCloseModal) {
            setShowModal(false)
            setModalContent()
        }
    }
    const addToParty = (userFighterId) => {
        let cant = 0
        let cantExceeded = false
        /* Checks if there are already 4 fighters in the party */
        fighters.forEach((fighter) => {
            if (fighter.in_party === "true") {
                cant++
            }
            if (cant === 4) {
                cantExceeded = true
            }
        })
        if (cantExceeded) {
            setAllowCloseModal(true)
            setModalContent("Can't add more than 4 members to the party.")
            setShowModal(true)
        } else {
            const parameters = [{
                user_fighter_id: userFighterId
            }]
            setModalContent('Adding to party...')
            setAllowCloseModal(false)
            setShowModal(true)
            fetch(backEndUrl + "/addtoparty", {
                method: 'POST', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parameters),
            }).then(() => {
                updateFighters()
            })
        }
    }
    const removeFromParty = (user_fighter_id) => {
        let newUser = user
        const parameters = [{
            user_fighter_id,
            user_id: newUser.user_id
        }]
        // Inicializa un contador
        let countInParty = 0
        // Recorre cada userfighter y verifica si in_party es "true"
        fighters.forEach((userfighter) => {
            if (userfighter.in_party === "true") {
                countInParty++
            }
        });
        if (countInParty > 1) {
            setModalContent('Removing from party...')
            setAllowCloseModal(false)
            setShowModal(true)
            fetch(backEndUrl + "/removefromparty", {
                method: 'POST', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parameters),
            }).then(() => { updateFighters() })
        } else {
            setModalContent('You need to have at least one fighter in the party')
            setAllowCloseModal(true)
            setShowModal(true)
        }

    }
    const viewActions = (move_id) => {
        let actions = []
        moves.forEach((move) => {
            if (move.move_id === move_id) {
                actions.push(move.actionmoves)
            }
        })
        setAllowCloseModal(true)
        if (actions[0]) {
            setModalContent(actions[0].map((action, index) => {
                return <div key={Math.random()} >
                    <p>{t('fighterspage.level')}: {action.level}</p>
                    <p>{t('fighterspage.action')}: {index + 1}</p>
                    <p>{t('fighterspage.inflicted_on')}: {t(`actions.${action.inflicted_on}`)}</p>
                    <p>{t('fighterspage.type')}: {t(`actions.${action.attack_type}`)}</p>
                    <p>{t('fighterspage.field')}: {t(`actions.${action.field}`)}</p>
                    <p>{t('fighterspage.value')}: {action.value}</p>
                </div>
            }))
            setShowModal(true)
        }
    }
    const removeAttack = (user_fighter_move_id) => {
        let selected = 0
        moves.forEach((move) => {
            if (move.selected === 1) {
                selected++
            }
        })
        if (selected === 0) {
            setModalContent(t('fighterspage.cantRemoveMove'))
        } else {
            setAllowCloseModal(false)
            setModalContent(t('fighterspage.removingMove'))
            const parameters = [{
                user_fighter_move_id
            }]
            fetch(backEndUrl + "/removeMove", {
                method: 'POST', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parameters),
            }).then(() => updateFighters())
        }
    }
    const addAttack = (user_fighter_move_id) => {
        let selected = 0
        moves.forEach((move) => {
            if (move.selected === 1) {
                selected++
            }
        })
        if (selected >= 4) {
            setModalContent(t('fighterspage.cantAddMove'))
        } else {
            setAllowCloseModal(false)
            setModalContent(t('fighterspage.addingMove'))
            const parameters = [{
                user_fighter_move_id
            }]
            fetch(backEndUrl + "/addMove", {
                method: 'POST', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parameters),
            }).then(() => { updateFighters() })
        }
    }
    useEffect(() => {
        if (moves) {
            if (!selectMoves) {
                setModalContent(
                    <ul>{moves.map((move) => {
                        return <Button key={move.user_fighter_move_id} onClick={() => { viewActions(move.move_id) }}>
                            {move.name}
                        </Button>
                    })} </ul>
                )
            } else {
                setModalContent(
                    <ul>{moves.map((move) => {
                        return <div key={move.user_fighter_move_id}>
                            {move.name}
                            {move.selected === 1 && <Button onClick={() => { removeAttack(move.user_fighter_move_id) }}>
                                {t('fighterspage.removeAttack')}
                            </Button>}
                            {move.selected === 0 && <Button onClick={() => { addAttack(move.user_fighter_move_id) }}>
                                {t('fighterspage.addAttack')}
                            </Button>}

                        </div>
                    })} </ul>
                )
            }
        }
    }, [moves, selectMoves])
    const viewMovements = (user_fighter_id, allowSelect) => {
        let moves = []
        fighters.forEach((fighter) => {
            if (fighter.user_fighter_id === user_fighter_id) {
                fighter.moves.forEach((move) => {
                    moves.push(move)
                })
            }
        })
        setSelectMoves(allowSelect)
        setAllowCloseModal(true)
        setMoves(moves)
    }
    useEffect(() => {
        if (modalContent) {
            setShowModal(true)
        }
    }, [modalContent])
    const setFirstFighter = (user_fighter_id) => {
        const parameters = [{
            user_id: user.user_id,
            user_fighter_id
        }]
        setModalContent(t('fighterspage.assigningFirst'))
        setShowModal(true)
        setAllowCloseModal(false)
        fetch(backEndUrl + "/setfirstfighter", {
            method: 'POST', // O 'PUT' si deseas sobrescribir completamente los datos del usuario
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        }).then(() => {
            updateFighters()
        })
    }

    const deleteFighter = (userFighterId) => {
        /* setUserFighterId(userFighterId)
         setShowConfirm(true)
         setShowModal(true)*/
    }
    const deleteUserFighter = async (userFighterId) => {
        /* let deleteFighter = await user.fighters.filter((fighter) => {
             return fighter.userFighterId === userFighterId
         })
         let newFighters = user.fighters.filter((fighter) => {
             return fighter.userFighterId !== userFighterId
         })
         const sell = user.objects[4].quantity
         let price = deleteFighter[0].price
         const result = sell + price
         let newUser = user
         newUser.objects[4].quantity = result
         newUser.fighters = newFighters
         setShowModal(false)
         setShowConfirm(false)*/
    }
    const fetchData = async () => {
        try {
            if (backEndUrl && activeUser) {
                const response = await fetch(backEndUrl + '/alluserfighters/' + activeUser);
                const data = await response.json();
                setFighters(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const updateFighters = async () => {
        await fetchData()
    }
    useEffect(() => {
        setShowModal(false)
        setModalContent()
    }, [fighters])
    useEffect(() => {
        updateFighters()
    }, [])
    return (
        <div alt="divContainerFightersPage" className={`${classes.body} ${classes.backgroundImg}`}>
            <Button colorType="lightgreen" value={t('fighterspage.back')} onClick={() => { navigate('/') }}></Button>
            <div className={classes.container} >
                {fighters &&
                    fighters.map((fighter, i) => {
                        return (<div className={classes.fighterContainer} key={fighter.user_fighter_id}>
                            <FighterCard fighter={fighter} showPrice={false}></FighterCard>
                            <Button completeWidth={true} onClick={() => { if (fighter.in_party === "true") { setFirstFighter(fighter.user_fighter_id) } else { setAllowCloseModal(true); setModalContent('You need to add the fighter to the party first.') } }} value={t('fighterspage.setFirst')}></Button>
                            <Button completeWidth={true} onClick={() => { viewMovements(fighter.user_fighter_id, false) }} value={t('fighterspage.viewMovements')}></Button>
                            <Button completeWidth={true} onClick={() => { viewMovements(fighter.user_fighter_id, true) }} value={t('fighterspage.selectMovements')}></Button>
                            {fighter.in_party === "true" ?
                                <Button completeWidth={true} onClick={() => { removeFromParty(fighter.user_fighter_id) }} value={t('fighterspage.removeFromParty')}></Button>
                                :
                                <Button completeWidth={true} onClick={() => { addToParty(fighter.user_fighter_id) }} value={t('fighterspage.addToParty')}></Button>
                            }
                            {/* <Button onClick={() => { deleteFighter(fighter.user_fighter_id) }} value="Sell Fighter"></Button> */}
                        </div>
                        );
                    })}
            </div>
            {/*showModal && !modalContent && <Modal styleType={"battlegroundColiseum"} onClose={closeModal} color="white">
            {showConfirm && <div>
                <h3>Are you sure you want to sell this fighter?</h3>
                <Button onClick={() => deleteUserFighter(userFighterId)}>Sell</Button>
            </div>}
            </Modal>*/}
            {showModal && modalContent && <Modal styleType={"battlegroundColiseum"} onClose={closeModal} color="white">
                {modalContent}
            </Modal>}
        </div >
    );

}

export default FightersPage