const userModel = () => {
    return ({
        name: "Red",
        objects: [
            {
                name: "potion",
                img: './assets/img/potion.png',
                value: 50
            },
            {
                name: "maxPotion",
                img: './assets/img/potion.png',
                value: 150
            }
        ],
        fighters: [{
            name: "Charizard",
            fighterId: 1,
            imgFront: './assets/img/charizard-front.gif',
            imgBack: './assets/img/charizard-back.png',
            active: true,
            maxHP: 500,
            currentHP: 500,
            attack: 100,
            specialAttak: 150,
            defense: 50,
            specialDefense: 50,
            accuracy: 85,
            status: "nothing",
            currentXP: 150,
            level: 1,
            moves: [
                { name: "Quick Attack", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -50 }] },
                { name: "Punch", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -100 }] },
                { name: "Def Up", actions: [{ inflictedOn: "user", field: "defense", value: 30 }] },
                { name: "Hiper Ray", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -550 }] }
            ]
        }, {
            name: "Goku",
            fighterId: 2,
            imgBack: './assets/img/goku.png',
            imgFront: './assets/img/goku-front.png',
            maxHP: 600,
            attack: 150,
            specialAttak: 250,
            defense: 100,
            specialDefense: 250,
            accuracy: 95,
            status: "nothing",
            active: false,
            currentHP: 600,
            currentXP: 200,
            level: 23,
            moves: [
                { name: "Kame Hame Ha", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -50 }] },
                { name: "Kaioken", actions: [{ inflictedOn: "user", field: "attack", value: 50 }] },
                { name: "Kaioken(X2)", actions: [{ inflictedOn: "user", field: "attack", value: 100 }] },
                { name: "Bite", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -500 }] }
            ]
        }, {
            name: "Mew",
            fighterId: 3,
            imgFront: './assets/img/mew-front.png',
            imgBack: './assets/img/mew-back.png',
            maxHP: 500,
            attack: 100,
            specialAttak: 350,
            defense: 50,
            specialDefense: 500,
            accuracy: 100,
            status: "nothing",
            active: false,
            currentHP: 500,
            currentXP: 200,
            level: 30,
            moves: [
                { name: "Quick Attack", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -150 }] },
                { name: "Sand Throw", actions: [{ inflictedOn: "enemy", field: "accuracy", value: -20 }, { inflictedOn: "enemy", field: "specialDefense", value: -20 }] },
                { name: "Def Up", actions: [{ inflictedOn: "user", field: "defense", value: 30 }] },
                { name: "Hiper Ray", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -250 }] }
            ]
        },
        {
            name: "Batman",
            fighterId: 4,
            imgFront: './assets/img/batman-front.png',
            imgBack: './assets/img/batman-back.png',
            maxHP: 500,
            attack: 100,
            specialAttak: 350,
            defense: 50,
            specialDefense: 500,
            accuracy: 100,
            status: "nothing",
            active: false,
            currentHP: 500,
            currentXP: 200,
            level: 10,
            moves: [
                { name: "Boomerang Throw", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -150 }] },
                { name: "I'm BATMAN", actions: [{ inflictedOn: "enemy", field: "accuracy", value: -30 }, { inflictedOn: "enemy", field: "specialDefense", value: -20 }] },
                { name: "Cape Cover", actions: [{ inflictedOn: "user", field: "defense", value: 30 }] },
                { name: "Karate Moves", actions: [{ inflictedOn: "enemy", field: "currentHP", value: -250 }] }
            ]
        }]
    })
}

export default userModel