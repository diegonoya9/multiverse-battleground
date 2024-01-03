// Fighter.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Fighter from './Fighter';

const fighter={
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
test('renders Fighter component', () => {
  // Renderiza Fighter dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
      <Fighter turn="user" userAttacked="userPowerUp" fighter={fighter}/>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados estén presentes
  expect(getByText(/Shadow/)).toBeInTheDocument();
});
