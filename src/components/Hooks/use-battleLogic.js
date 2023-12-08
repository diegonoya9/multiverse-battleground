import { useState, useEffect } from "react";
const useBattleLogic = () => {
    const [turn, setTurn] = useState("user")
    const enemyAI = (battleEnded, setAttack, setMenuActive, userFighter, enemyFighter, attackUser, attackEnemy) => {
        if (turn === "enemy" && !battleEnded.finished) {
            const wait = () => {
                setTimeout(() => {
                    setMenuActive(true)
                    setAttack((prevState) => {
                        let newState = { ...prevState }
                        newState.active = false
                        return newState
                    })
                    setTurn("user")
                    // Aquí puedes colocar la acción que quieres ejecutar después de 3 segundos
                }, 1000); // 3000 milisegundos = 3 segundos
            };
            let randomMove = Math.floor(Math.random() * 4)
            enemyFighter.moves[randomMove].actions.forEach((action) => {
                if (action.inflictedOn === "enemy") {
                    setAttack((prevState) => {
                        let newState = { ...prevState }
                        newState.active = true
                        newState.inflictedOn = "user"
                        newState.src = "./assets/img/fire.png"
                        return newState
                    })
                    attackUser(action)
                } else {
                    setAttack((prevState) => {
                        let newState = { ...prevState }
                        newState.active = true
                        newState.inflictedOn = "enemy"
                        newState.src = "./assets/img/aura.png"
                        return newState
                    })
                    attackEnemy(action)
                }
            })
            wait();
        }
    }
    return { turn, setTurn, enemyAI }
}

export default useBattleLogic