import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MyContextProvider } from '../../context/MyContext';
import Home from './Home'
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

beforeAll(() => {
    i18n.use(initReactI18next)
});
const mockUserContext = {
    idUsuario: 1,
    user: [
        {
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
    ]
    // Otros datos relacionados con el usuario si es necesario
};
let component;
beforeEach(async () => {
    component = render(<>
        <MyContextProvider value={{ userContext: mockUserContext }}>
            <I18nextProvider i18n={i18n}>
                <Home />
            </I18nextProvider>
        </MyContextProvider>
    </>
    );
})
test('renders home component', () => {
    component.getByText(i18n.t('home.login'))
})