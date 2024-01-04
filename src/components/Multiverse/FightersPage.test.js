// FightersPage.test.js
import React from 'react';
import { render, waitFor, act, fireEvent, cleanup } from '@testing-library/react';
import { MyContextProvider } from '../../context/MyContext';
import FightersPage from './FightersPage';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

beforeAll(() => {
    i18n.use(initReactI18next)
});
const user =
{
    "user_id": 1,
    "email": "lina@gmail.com",
    "password": "123456",
    "name": "Lina",
    "money": 5000,
    "avatar": "lina.jpg",
    "profile": "Admin",
    "userfighters": [
        {
            "user_fighter_id": 26,
            "user_id": 1,
            "fighter_id": 5,
            "level": 5,
            "active": "true",
            "in_party": "true",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 100000,
            "extra_special_attack": 100000,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "current_xp": 3100,
            "fighters": {
                "fighter_id": 5,
                "img_back": "./assets/img/mew-back.png",
                "img_front": "./assets/img/mew-front.png",
                "name": "Mew",
                "price": 100
            },
            "img_front": "./assets/img/mew-front.png",
            "img_back": "./assets/img/mew-back.png"
        }
    ],
    "userobjects": [
        {
            "user_object_id": 2,
            "user_id": 1,
            "object_id": 7,
            "quantity": 25911,
            "objects": {
                "name": "Money",
                "description": "Money"
            },
            "name": "Money",
            "description": "Money"
        },
        {
            "user_object_id": 9,
            "user_id": 1,
            "object_id": 1,
            "quantity": 8,
            "objects": {
                "name": "Potion",
                "description": "Heals the user 2000 HP"
            },
            "name": "Potion",
            "description": "Heals the user 2000 HP"
        },
        {
            "user_object_id": 10,
            "user_id": 1,
            "object_id": 2,
            "quantity": 12,
            "objects": {
                "name": "Super Potion",
                "description": "Heals the user 5000 HP"
            },
            "name": "Super Potion",
            "description": "Heals the user 5000 HP"
        },
        {
            "user_object_id": 11,
            "user_id": 1,
            "object_id": 3,
            "quantity": 1,
            "objects": {
                "name": "Milanesa",
                "description": "Increases user defense by 150"
            },
            "name": "Milanesa",
            "description": "Increases user defense by 150"
        },
        {
            "user_object_id": 12,
            "user_id": 1,
            "object_id": 4,
            "quantity": 1,
            "objects": {
                "name": "Huevo Duro",
                "description": "Increases user attack by 100"
            },
            "name": "Huevo Duro",
            "description": "Increases user attack by 100"
        },
        {
            "user_object_id": 13,
            "user_id": 1,
            "object_id": 6,
            "quantity": 1,
            "objects": {
                "name": "Coffee",
                "description": "Increase special attack by 150"
            },
            "name": "Coffee",
            "description": "Increase special attack by 150"
        },
        {
            "user_object_id": 14,
            "user_id": 1,
            "object_id": 5,
            "quantity": 1,
            "objects": {
                "name": "Dopamine",
                "description": "Increase accuracy by 25"
            },
            "name": "Dopamine",
            "description": "Increase accuracy by 25"
        }
    ]
}

const fighters = [
    {
        "user_fighter_id": 26,
        "user_id": 1,
        "fighter_id": 5,
        "level": 5,
        "active": "true",
        "in_party": "true",
        "extra_accuracy": 0,
        "extra_max_hp": 0,
        "extra_attack": 100000,
        "extra_special_attack": 100000,
        "extra_defense": 0,
        "extra_special_defense": 0,
        "current_xp": 3100,
        "fighters": {
            "fighter_id": 5,
            "img_back": "./assets/img/mew-back.png",
            "img_front": "./assets/img/mew-front.png",
            "name": "Mew",
            "price": 100
        },
        "name": "Mew",
        "img_back": "./assets/img/mew-back.png",
        "img_front": "./assets/img/mew-front.png",
        "attack": 419,
        "special_attack": 439,
        "defense": 433,
        "special_defense": 442,
        "accuracy": 65,
        "max_hp": 4261,
        "current_hp": 4261,
        "moves": [
            {
                "user_fighter_move_id": 18,
                "move_id": 5,
                "user_fighter_id": 26,
                "current_xp": 1,
                "moves": {
                    "move_id": 5,
                    "fighter_id": 5,
                    "img": "./assets/img/lightsBall.gif",
                    "name": "Energy Ball",
                    "sfx": "/assets/sounds/SFX/Mew1.mp3",
                    "mp": 20,
                    "actionmoves": [
                        {
                            "action_move_id": 5,
                            "move_id": 5,
                            "attack_type": "normal",
                            "field": "current_hp",
                            "inflicted_on": "enemy",
                            "value": -150
                        }
                    ]
                }
            },
            {
                "user_fighter_move_id": 19,
                "move_id": 14,
                "user_fighter_id": 26,
                "current_xp": 1,
                "moves": {
                    "move_id": 14,
                    "fighter_id": 5,
                    "img": "./assets/img/cloud.gif",
                    "name": "Smoke Throw",
                    "sfx": "/assets/sounds/SFX/Mew2.mp3",
                    "mp": 20,
                    "actionmoves": [
                        {
                            "action_move_id": 14,
                            "move_id": 14,
                            "attack_type": "special",
                            "field": "accuracy",
                            "inflicted_on": "enemy",
                            "value": -20
                        }
                    ]
                }
            },
            {
                "user_fighter_move_id": 20,
                "move_id": 15,
                "user_fighter_id": 26,
                "current_xp": 1,
                "moves": {
                    "move_id": 15,
                    "fighter_id": 5,
                    "img": "./assets/img/petals.gif",
                    "name": "Cutie",
                    "sfx": "/assets/sounds/SFX/Mew3.mp3",
                    "mp": 20,
                    "actionmoves": [
                        {
                            "action_move_id": 15,
                            "move_id": 15,
                            "attack_type": "special",
                            "field": "defense",
                            "inflicted_on": "user",
                            "value": 30
                        }
                    ]
                }
            },
            {
                "user_fighter_move_id": 21,
                "move_id": 16,
                "user_fighter_id": 26,
                "current_xp": 1,
                "moves": {
                    "move_id": 16,
                    "fighter_id": 5,
                    "img": "./assets/img/ray.gif",
                    "name": "Hiper Ray",
                    "sfx": "/assets/sounds/SFX/Mew4.mp3",
                    "mp": 20,
                    "actionmoves": [
                        {
                            "action_move_id": 16,
                            "move_id": 16,
                            "attack_type": "special",
                            "field": "current_hp",
                            "inflicted_on": "enemy",
                            "value": -300
                        }
                    ]
                }
            }
        ]
    }
]
// Mock del contexto para la prueba
const mockUserContext = {
    idUsuario: 1,
    backEndUrl: "http://localhost:3009/api"
    // Otros datos relacionados con el usuario si es necesario
};

let component;
beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(fighters)
    });
    await act(async () => {
        component = render(<>
            <I18nextProvider i18n={i18n}>
                <MyContextProvider value={{ userContext: mockUserContext }}>
                    <FightersPage user={user} />
                </MyContextProvider>
            </I18nextProvider>
        </>
        );
    });
})
afterEach(() => {
    global.fetch.mockRestore();
    cleanup();
});
test('renders fighters page and selects First in Battle component', async () => {
    const firstInBattleButton = component.getByText(i18n.t('fighterspage.setFirst'))
    await waitFor(() => {
        fireEvent.click(firstInBattleButton)
    });
});
test('renders fighters page component and removes from party', async () => {
    // Espera que la operación asíncrona se complete antes de realizar las verificaciones
    await waitFor(() => {
        component.getByText("Mew");
    });
    const mainMenuButton = component.getByText("Back to Main Menu");
    const removeFromPartyButton = component.getByText(i18n.t('fighterspage.removeFromParty'))
    await waitFor(() => {
        fireEvent.click(removeFromPartyButton)
    });
});
test('renders fighters page component and adds it to party', async () => {
    const clonedFighters = fighters.slice(); // Clona el arreglo
    // Modifica el clon en lugar del arreglo original
    clonedFighters[0].in_party = "false";
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(fighters)
    });


    await act(async () => {
        component = render(
            <MyContextProvider value={{ userContext: mockUserContext }}>
                <FightersPage user={user} />
            </MyContextProvider>
        );
    });
    const addToPartyButton = component.getByText(i18n.t('fighterspage.addToParty'))
    await waitFor(() => {
        fireEvent.click(addToPartyButton)
    });
    // Realiza otras verificaciones según sea necesario
});
test('renders fighters page and selects a movement component', async () => {
    const viewMovements = component.getByText(i18n.t('fighterspage.viewMovements'))
    await waitFor(() => {
        fireEvent.click(viewMovements)
    });
    const energyBallMovement = component.getByText("Energy Ball")
    fireEvent.click(energyBallMovement)
    const actionInflictedOn = component.getByText("Inflicted on: enemy")
});

