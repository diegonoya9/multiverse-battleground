// SubMenu.test.js
import { fireEvent,render } from '@testing-library/react';
import SubMenu from './SubMenu';
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
            "currentMP":20,
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
    "fighters": [
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
            "current_hp":300,
            "fighters": {
                "fighter_id": 5,
                "img_back": "./assets/img/mew-back.png",
                "img_front": "./assets/img/mew-front.png",
                "name": "Mew",
                "price": 100
            },
            "name":"Mew",
            "img_front": "./assets/img/mew-front.png",
            "img_back": "./assets/img/mew-back.png"
        }
    ],
    "objects": [
        {
            "user_object_id": 2,
            "user_id": 1,
            "object_id": 7,
            "quantity": 25911,
            "objects": {
                "name": "Money",
                "description": "Money",
                "category":"battleItem"

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
                "description": "Heals the user 2000 HP",
                "category":"battleItem"
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
                "description": "Heals the user 5000 HP",
                "category":"battleItem"
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
                "description": "Increases user defense by 150",
                "category":"battleItem"
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
                "description": "Increases user attack by 100",
                "category":"battleItem"
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
                "description": "Increase special attack by 150",
                "category":"battleItem"
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
                "description": "Increase accuracy by 25",
                "category":"battleItem"
            },
            "name": "Dopamine",
            "description": "Increase accuracy by 25"
        }
    ]
}
const mockHandler = jest.fn();
test('renders SubMenu component with fighters option', () => {
    const component = render(<SubMenu selectedOption="fighters" changeUserFighter={mockHandler} userFighter={fighter} clickHandler={mockHandler} toggleSubMenu={mockHandler} user={user} />)
    const fighterButton=component.getByText("Mew")
    component.findByAltText('fighter mini')
    fireEvent.click(fighterButton)
    expect(mockHandler.mock.calls).toHaveLength(3)
});
test('renders SubMenu component with objects option', () => {
    const component = render(<SubMenu selectedOption="objects" userFighter={fighter} clickHandler={mockHandler} toggleSubMenu={mockHandler} user={user} />)
    const objectButton=component.getByText("Potion:8")
    component.findByAltText('fighter mini')
    fireEvent.click(objectButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
});
test('renders SubMenu component with attacks option', () => {
    const component = render(<SubMenu selectedOption="attacks" userFighter={fighter} clickHandler={mockHandler} toggleSubMenu={mockHandler} user={user} />)
    const attackButton=component.getByText("Energy Ball:20/20")
    fireEvent.click(attackButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
});
