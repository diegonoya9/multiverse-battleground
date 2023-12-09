const userModel = (origin, user) => {
    let activeArray = []
    if (origin === "user") {
        activeArray = [true, false, false, false]
    } else {
        let randomValue = Math.round(Math.random() * 3)
        for (let i = 0; i < 4; i++) {
            if (i === randomValue) {
                activeArray.push(true)
            } else {
                activeArray.push(false)
            }
        }
    }
    return (user)
}

export default userModel