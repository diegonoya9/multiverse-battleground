import { useState } from "react"

const useBattleState = () => {
    const [battleEnded, setBattleEnded] = useState({ finished: false, winner: null })
    const endBattle = (winner, finished) => {
        setBattleEnded((prevState) => {
            let newState = { ...prevState }
            newState.finished = finished
            newState.winner = winner
            return newState
        })
    }
    const restartBattle = () => {
        setBattleEnded((prevState) => {
            let newState = { ...prevState }
            newState.finished = false
            newState.winner = null
            return newState
        })
    }
    return { battleEnded, endBattle, restartBattle }
}

export default useBattleState