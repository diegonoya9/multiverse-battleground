// FightersPage.test.js
import React from 'react';
import { render, waitFor, act, fireEvent, cleanup } from '@testing-library/react';
import { MyContextProvider } from '../../context/MyContext';
import FightersPage from './FightersPage';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


beforeAll(() => {
    i18n.use(initReactI18next)
});
const user = {
    "user_id": 7,
    "email": "ameo@gmail.com",
    "password": "123456",
    "name": "Ameo",
    "money": 5000,
    "avatar": "Ameo.jpg",
    "google_id": "109040415930667649612",
    "google_picture": "https://lh3.googleusercontent.com/a/ACg8ocJVpz8EGAuppzMzh1X3UguqNUgskdKoYMfNHKp0p7eN_A=s96-c'",
    "profile": "Admin",
    "bg_volume": 36,
    "sound_volume": 1,
    "sfx_volume": 62,
    "userfighters": [
        {
            "user_fighter_id": 6,
            "user_id": 7,
            "fighter_id": 1,
            "level": 3,
            "active": "false",
            "in_party": "false",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "attack_multiplier": 1,
            "special_attack_multiplier": 1,
            "defense_multiplier": 1,
            "special_defense_multiplier": 1,
            "current_xp": 1500,
            "fighters": {
                "fighter_id": 1,
                "img_back": "./assets/img/charizard-back.png",
                "img_front": "./assets/img/charizard-front.gif",
                "name": "Charizard",
                "price": 110
            },
            "img_front": "./assets/img/charizard-front.gif",
            "img_back": "./assets/img/charizard-back.png"
        },
        {
            "user_fighter_id": 29,
            "user_id": 7,
            "fighter_id": 2,
            "level": 2,
            "active": "false",
            "in_party": "false",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "attack_multiplier": 1,
            "special_attack_multiplier": 1,
            "defense_multiplier": 1,
            "special_defense_multiplier": 1,
            "current_xp": 500,
            "fighters": {
                "fighter_id": 2,
                "img_back": "./assets/img/batman-back.png",
                "img_front": "./assets/img/batman-front.png",
                "name": "Batman",
                "price": 100
            },
            "img_front": "./assets/img/batman-front.png",
            "img_back": "./assets/img/batman-back.png"
        },
        {
            "user_fighter_id": 30,
            "user_id": 7,
            "fighter_id": 4,
            "level": 18,
            "active": "false",
            "in_party": "false",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "attack_multiplier": 1,
            "special_attack_multiplier": 1,
            "defense_multiplier": 1,
            "special_defense_multiplier": 1,
            "current_xp": 35400,
            "fighters": {
                "fighter_id": 4,
                "img_back": "./assets/img/vegeta-back.gif",
                "img_front": "./assets/img/vegeta-front.gif",
                "name": "Vegeta",
                "price": 100
            },
            "img_front": "./assets/img/vegeta-front.gif",
            "img_back": "./assets/img/vegeta-back.gif"
        },
        {
            "user_fighter_id": 31,
            "user_id": 7,
            "fighter_id": 7,
            "level": 12,
            "active": "false",
            "in_party": "false",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "attack_multiplier": 1,
            "special_attack_multiplier": 1,
            "defense_multiplier": 1,
            "special_defense_multiplier": 1,
            "current_xp": 16700,
            "fighters": {
                "fighter_id": 7,
                "img_back": "./assets/img/Ikki-back.gif",
                "img_front": "./assets/img/Ikki-front.gif",
                "name": "Ikki",
                "price": 100
            },
            "img_front": "./assets/img/Ikki-front.gif",
            "img_back": "./assets/img/Ikki-back.gif"
        },
        {
            "user_fighter_id": 32,
            "user_id": 7,
            "fighter_id": 3,
            "level": 13,
            "active": "false",
            "in_party": "true",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "attack_multiplier": 1,
            "special_attack_multiplier": 1,
            "defense_multiplier": 1,
            "special_defense_multiplier": 1,
            "current_xp": 18700,
            "fighters": {
                "fighter_id": 3,
                "img_back": "./assets/img/goku.png",
                "img_front": "/assets/img/goku-front.png",
                "name": "Goku",
                "price": 100
            },
            "img_front": "/assets/img/goku-front.png",
            "img_back": "./assets/img/goku.png"
        },
        {
            "user_fighter_id": 33,
            "user_id": 7,
            "fighter_id": 5,
            "level": 15,
            "active": "false",
            "in_party": "true",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "attack_multiplier": 1,
            "special_attack_multiplier": 1,
            "defense_multiplier": 1,
            "special_defense_multiplier": 1,
            "current_xp": 22600,
            "fighters": {
                "fighter_id": 5,
                "img_back": "./assets/img/mew-back.png",
                "img_front": "./assets/img/mew-front.png",
                "name": "Mew",
                "price": 100
            },
            "img_front": "./assets/img/mew-front.png",
            "img_back": "./assets/img/mew-back.png"
        },
        {
            "user_fighter_id": 34,
            "user_id": 7,
            "fighter_id": 6,
            "level": 3,
            "active": "false",
            "in_party": "false",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "attack_multiplier": 1,
            "special_attack_multiplier": 1,
            "defense_multiplier": 1,
            "special_defense_multiplier": 1,
            "current_xp": 1400,
            "fighters": {
                "fighter_id": 6,
                "img_back": "./assets/img/michael3.gif",
                "img_front": "./assets/img/michael-front.gif",
                "name": "Michael",
                "price": 100
            },
            "img_front": "./assets/img/michael-front.gif",
            "img_back": "./assets/img/michael3.gif"
        },
        {
            "user_fighter_id": 35,
            "user_id": 7,
            "fighter_id": 8,
            "level": 12,
            "active": "true",
            "in_party": "true",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "attack_multiplier": 1,
            "special_attack_multiplier": 1,
            "defense_multiplier": 1,
            "special_defense_multiplier": 1,
            "current_xp": 14800,
            "fighters": {
                "fighter_id": 8,
                "img_back": "./assets/img/venom-back.gif",
                "img_front": "./assets/img/venom-front.gif",
                "name": "Venom",
                "price": 999999
            },
            "img_front": "./assets/img/venom-front.gif",
            "img_back": "./assets/img/venom-back.gif"
        },
        {
            "user_fighter_id": 36,
            "user_id": 7,
            "fighter_id": 9,
            "level": 8,
            "active": "false",
            "in_party": "true",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "attack_multiplier": 1,
            "special_attack_multiplier": 1,
            "defense_multiplier": 1,
            "special_defense_multiplier": 1,
            "current_xp": 6700,
            "fighters": {
                "fighter_id": 9,
                "img_back": "./assets/img/joker-back.gif",
                "img_front": "./assets/img/joker-front.gif",
                "name": "Joker",
                "price": 999999
            },
            "img_front": "./assets/img/joker-front.gif",
            "img_back": "./assets/img/joker-back.gif"
        },
        {
            "user_fighter_id": 37,
            "user_id": 7,
            "fighter_id": 9,
            "level": 1,
            "active": "false",
            "in_party": "false",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "attack_multiplier": 1,
            "special_attack_multiplier": 1,
            "defense_multiplier": 1,
            "special_defense_multiplier": 1,
            "current_xp": 0,
            "fighters": {
                "fighter_id": 9,
                "img_back": "./assets/img/joker-back.gif",
                "img_front": "./assets/img/joker-front.gif",
                "name": "Joker",
                "price": 999999
            },
            "img_front": "./assets/img/joker-front.gif",
            "img_back": "./assets/img/joker-back.gif"
        },
        {
            "user_fighter_id": 51,
            "user_id": 7,
            "fighter_id": 7,
            "level": 1,
            "active": "false",
            "in_party": "false",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "attack_multiplier": 1,
            "special_attack_multiplier": 1,
            "defense_multiplier": 1,
            "special_defense_multiplier": 1,
            "current_xp": 0,
            "fighters": {
                "fighter_id": 7,
                "img_back": "./assets/img/Ikki-back.gif",
                "img_front": "./assets/img/Ikki-front.gif",
                "name": "Ikki",
                "price": 100
            },
            "img_front": "./assets/img/Ikki-front.gif",
            "img_back": "./assets/img/Ikki-back.gif"
        },
        {
            "user_fighter_id": 52,
            "user_id": 7,
            "fighter_id": 7,
            "level": 1,
            "active": "0",
            "in_party": "0",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "attack_multiplier": 1,
            "special_attack_multiplier": 1,
            "defense_multiplier": 1,
            "special_defense_multiplier": 1,
            "current_xp": 0,
            "fighters": {
                "fighter_id": 7,
                "img_back": "./assets/img/Ikki-back.gif",
                "img_front": "./assets/img/Ikki-front.gif",
                "name": "Ikki",
                "price": 100
            },
            "img_front": "./assets/img/Ikki-front.gif",
            "img_back": "./assets/img/Ikki-back.gif"
        }
    ],
    "userobjects": [
        {
            "user_object_id": 1,
            "user_id": 7,
            "object_id": 1,
            "quantity": 1,
            "objects": {
                "name": "Potion",
                "description": "Heals the user 2000 HP"
            },
            "name": "Potion",
            "description": "Heals the user 2000 HP"
        },
        {
            "user_object_id": 8,
            "user_id": 7,
            "object_id": 7,
            "quantity": 2994702,
            "objects": {
                "name": "Money",
                "description": "Money"
            },
            "name": "Money",
            "description": "Money"
        },
        {
            "user_object_id": 15,
            "user_id": 7,
            "object_id": 6,
            "quantity": 6,
            "objects": {
                "name": "Coffee",
                "description": "Increase special attack by 150"
            },
            "name": "Coffee",
            "description": "Increase special attack by 150"
        },
        {
            "user_object_id": 16,
            "user_id": 7,
            "object_id": 2,
            "quantity": 8,
            "objects": {
                "name": "Super Potion",
                "description": "Heals the user 5000 HP"
            },
            "name": "Super Potion",
            "description": "Heals the user 5000 HP"
        },
        {
            "user_object_id": 22,
            "user_id": 7,
            "object_id": 5,
            "quantity": 1,
            "objects": {
                "name": "Dopamine",
                "description": "Increase accuracy by 25"
            },
            "name": "Dopamine",
            "description": "Increase accuracy by 25"
        },
        {
            "user_object_id": 25,
            "user_id": 7,
            "object_id": 3,
            "quantity": 15052,
            "objects": {
                "name": "Milanesa",
                "description": "Increases user defense by 150"
            },
            "name": "Milanesa",
            "description": "Increases user defense by 150"
        },
        {
            "user_object_id": 26,
            "user_id": 7,
            "object_id": 4,
            "quantity": 25037,
            "objects": {
                "name": "Huevo Duro",
                "description": "Increases user attack by 100"
            },
            "name": "Huevo Duro",
            "description": "Increases user attack by 100"
        }
    ]
}


const fighters = [
    {
        "user_fighter_id": 26,
        "user_id": 1,
        "fighter_id": 5,
        "level": 50,
        "active": "false",
        "in_party": "true",
        "extra_accuracy": 0,
        "extra_max_hp": 0,
        "extra_attack": 0,
        "extra_special_attack": 0,
        "extra_defense": 0,
        "extra_special_defense": 0,
        "current_xp": 259800,
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
        "attack": 4705,
        "special_attack": 4717,
        "defense": 4712,
        "special_defense": 4731,
        "accuracy": 102,
        "max_hp": 49394,
        "current_hp": 49394,
        "moves": [
            {
                "user_fighter_move_id": 18,
                "move_id": 5,
                "user_fighter_id": 26,
                "current_xp": 1,
                "level": 5,
                "movelevel_id": 269,
                "img": "./assets/img/lightsBall.gif",
                "name": "Energy Ball",
                "sfx": "/assets/sounds/SFX/Mew1.mp3",
                "mp": 20,
                "actionmoves": [
                    {
                        "action_move_id": 128,
                        "move_id": 5,
                        "attack_type": "normal",
                        "field": "current_hp",
                        "inflicted_on": "enemy",
                        "value": -650,
                        "level": 5,
                        "movelevel_id": 269
                    }
                ]
            },
            {
                "user_fighter_move_id": 19,
                "move_id": 14,
                "user_fighter_id": 26,
                "current_xp": 1,
                "level": 1,
                "movelevel_id": 18,
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
                        "value": -20,
                        "level": 1,
                        "movelevel_id": 18
                    }
                ]
            },
            {
                "user_fighter_move_id": 20,
                "move_id": 15,
                "user_fighter_id": 26,
                "current_xp": 1,
                "level": 1,
                "movelevel_id": 19,
                "img": "./assets/img/petals.gif",
                "name": "Cutie",
                "sfx": "/assets/sounds/SFX/Mew3.mp3",
                "mp": 20,
                "actionmoves": [
                    {
                        "action_move_id": 15,
                        "move_id": 15,
                        "attack_type": "special",
                        "field": "extra_defense",
                        "inflicted_on": "user",
                        "value": 30,
                        "level": 1,
                        "movelevel_id": 19
                    }
                ]
            },
            {
                "user_fighter_move_id": 21,
                "move_id": 16,
                "user_fighter_id": 26,
                "current_xp": 1,
                "level": 1,
                "movelevel_id": 20,
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
                        "value": -300,
                        "level": 1,
                        "movelevel_id": 20
                    }
                ]
            }
        ]
    }
]
// Mock del contexto para la prueba
const mockUserContext = {
    idUsuario: 1,
    backEndUrl: "http://localhost:3009/api",
    user: user,
    bg: 0,
    sound: 0,
    sfx: 0
    // Otros datos relacionados con el usuario si es necesario
};
const testRouter = createBrowserRouter([
    {
        path: '/',
        element: <div />,
    },
]);
let component;
beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(fighters)
    });
    await act(async () => {
        component = render(
            <>
                <I18nextProvider i18n={i18n}>
                    <RouterProvider router={testRouter}>
                        <MyContextProvider value={{ userContext: mockUserContext }}>
                            <FightersPage />
                        </MyContextProvider>
                    </RouterProvider>
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
                <RouterProvider router={testRouter}>
                    <FightersPage />
                </RouterProvider>
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

