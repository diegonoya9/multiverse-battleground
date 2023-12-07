import { useState, useEffect } from "react"

const useEnemy = () => {
    const [enemyFighter, setEnemyFighter] = useState()
    const fighterInit = {
        name: "Charizard",
        maxHP: 400,
        currentHP: 400,
        level: 13,
        currentXP: 500,
        moves: [
            { name: "Quick Attack", damage: 350 },
            { name: "Punch", damage: 3150 },
            { name: "Thunderbolt", damage: 340 },
            { name: "Hiper Ray", damage: 3200 }
        ]
    }
    const damageEnemy = (damage) => {
        let newCurrentHP
        console.log(damage)
        if (enemyFighter.currentHP >= damage) {
            newCurrentHP = enemyFighter.currentHP - damage
        } else {
            newCurrentHP = 0
        }
        setEnemyFighter((prevState) => {
            let newState = { ...prevState }
            newState.currentHP = newCurrentHP
            return newState
        })
    }

    const restartEnemyFighter = () => {
        setEnemyFighter(fighterInit)
    }
    useEffect(() => {
        setEnemyFighter(fighterInit)
    }, [])

    return [enemyFighter, damageEnemy, restartEnemyFighter]
}

export default useEnemy