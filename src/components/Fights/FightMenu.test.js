// FightMenu.test.js
import { fireEvent, render } from '@testing-library/react';
import FightMenu from './FightMenu';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

beforeAll(() => {
    i18n.use(initReactI18next)
});
const fighter = {
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
        },
        {
            "user_fighter_id": 27,
            "user_id": 1,
            "fighter_id": 4,
            "level": 2,
            "active": "false",
            "in_party": "true",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "current_xp": 800,
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
            "user_fighter_id": 28,
            "user_id": 1,
            "fighter_id": 6,
            "level": 2,
            "active": "false",
            "in_party": "false",
            "extra_accuracy": 0,
            "extra_max_hp": 0,
            "extra_attack": 0,
            "extra_special_attack": 0,
            "extra_defense": 0,
            "extra_special_defense": 0,
            "current_xp": 900,
            "fighters": {
                "fighter_id": 6,
                "img_back": "./assets/img/michael3.gif",
                "img_front": "./assets/img/michael-front.gif",
                "name": "Michael",
                "price": 100
            },
            "img_front": "./assets/img/michael-front.gif",
            "img_back": "./assets/img/michael3.gif"
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
let component
beforeEach(() => {
    const mockHandler = jest.fn();
    // Renderiza FightMenu dentro de MyContextProvider con el contexto simulado

    component = render(
        <I18nextProvider i18n={i18n}>
            <FightMenu user={user} userFighter={fighter} clickHandler={mockHandler} />
        </I18nextProvider>
    );
});
test('renders FightMenu component', () => {
    // Puedes agregar expectativas para asegurarte de que los elementos esperados estén presentes
    const attacksButton = component.getByText("Attacks")
    fireEvent.click(attacksButton)
    component.findByAltText('subMenu')
});
test('run button from fightMenu works', () => {
    const runButton = component.getByText(i18n.t('fightmenu.run'))
    fireEvent.click(runButton)
})
