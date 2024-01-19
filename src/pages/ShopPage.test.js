// ShopPage.test.js
import React from 'react';
import { render, screen, waitFor, act, fireEvent  } from '@testing-library/react';
import { MyContextProvider } from '../context/MyContext';
import ShopPage from './ShopPage'; 
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { MemoryRouter } from 'react-router-dom';

beforeAll(() => {
  i18n.use(initReactI18next)
});
const objects = [
  {
    "user_object_id": 2,
    "user_id": 1,
    "object_id": 7,
    "quantity": 25911,
    "objects": {
      "object_id": 7,
      "category": "userItem",
      "description": "Money",
      "img": "./assets/img/money.png",
      "name": "Money",
      "price": 1,
      "quantity": 1,
      "type": "consumable",
      "actionobjects": []
    },
    "name": "Money",
    "description": "Money",
    "img": "./assets/img/money.png"
  }
]
const user = [
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
    "name": "Charizard",
    "img_back": "./assets/img/charizard-back.png",
    "img_front": "./assets/img/charizard-front.gif",
    "attack": 296,
    "special_attack": 308,
    "defense": 264,
    "special_defense": 259,
    "accuracy": 65,
    "max_hp": 2261,
    "current_hp": 2261,
    "moves": [
      {
        "user_fighter_move_id": 65,
        "move_id": 1,
        "user_fighter_id": 6,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 1,
        "selected": 1,
        "img": "./assets/img/fire.png",
        "name": "Flame",
        "sfx": "/assets/sounds/SFX/CharizardFlame.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 1,
            "move_id": 1,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -150,
            "level": 1,
            "movelevel_id": 1
          }
        ]
      },
      {
        "user_fighter_move_id": 66,
        "move_id": 8,
        "user_fighter_id": 6,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 2,
        "selected": 1,
        "img": "./assets/img/redSlash.gif",
        "name": "Punch",
        "sfx": "/assets/sounds/SFX/CharizardPunch.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 8,
            "move_id": 8,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -100,
            "level": 1,
            "movelevel_id": 2
          }
        ]
      },
      {
        "user_fighter_move_id": 67,
        "move_id": 9,
        "user_fighter_id": 6,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 3,
        "selected": 1,
        "img": "./assets/img/aura.gif",
        "name": "Roar",
        "sfx": "/assets/sounds/SFX/CharizardDefUp.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 9,
            "move_id": 9,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "user",
            "value": 30,
            "level": 1,
            "movelevel_id": 3
          }
        ]
      },
      {
        "user_fighter_move_id": 68,
        "move_id": 10,
        "user_fighter_id": 6,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 4,
        "selected": 1,
        "img": "./assets/img/ray.gif",
        "name": "Hiper Ray",
        "sfx": "/assets/sounds/SFX/CharizardHiperRay.mp3",
        "mp": 6,
        "actionmoves": [
          {
            "action_move_id": 10,
            "move_id": 10,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -500,
            "level": 1,
            "movelevel_id": 4
          }
        ]
      }
    ]
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
    "name": "Batman",
    "img_back": "./assets/img/batman-back.png",
    "img_front": "./assets/img/batman-front.png",
    "attack": 174,
    "special_attack": 197,
    "defense": 205,
    "special_defense": 146,
    "accuracy": 65,
    "max_hp": 1225,
    "current_hp": 1225,
    "moves": [
      {
        "user_fighter_move_id": 72,
        "move_id": 2,
        "user_fighter_id": 29,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 5,
        "selected": 1,
        "img": "./assets/img/redSlash.gif",
        "name": "Boomerang Throw",
        "sfx": "/assets/sounds/SFX/batflap.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 2,
            "move_id": 2,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -200,
            "level": 1,
            "movelevel_id": 5
          }
        ]
      },
      {
        "user_fighter_move_id": 73,
        "move_id": 17,
        "user_fighter_id": 29,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 6,
        "selected": 1,
        "img": "./assets/img/moneyThrow.gif",
        "name": "I'm BATMAN",
        "sfx": "/assets/sounds/SFX/imbatman.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 17,
            "move_id": 17,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "enemy",
            "value": -250,
            "level": 1,
            "movelevel_id": 6
          },
          {
            "action_move_id": 18,
            "move_id": 17,
            "attack_type": "normal",
            "field": "extra_special_defense",
            "inflicted_on": "enemy",
            "value": -250,
            "level": 1,
            "movelevel_id": 6
          }
        ]
      },
      {
        "user_fighter_move_id": 74,
        "move_id": 18,
        "user_fighter_id": 29,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 7,
        "selected": 1,
        "img": "./assets/img/2eSd.gif",
        "name": "Cape Cover",
        "sfx": "/assets/sounds/SFX/batflap.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 19,
            "move_id": 18,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "user",
            "value": 400,
            "level": 1,
            "movelevel_id": 7
          }
        ]
      },
      {
        "user_fighter_move_id": 75,
        "move_id": 19,
        "user_fighter_id": 29,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 8,
        "selected": 1,
        "img": "./assets/img/bat.gif",
        "name": "BatiBat",
        "sfx": "/assets/sounds/SFX/batflap.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 20,
            "move_id": 19,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -350,
            "level": 1,
            "movelevel_id": 8
          }
        ]
      }
    ]
  },
  {
    "user_fighter_id": 30,
    "user_id": 7,
    "fighter_id": 4,
    "level": 18,
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
    "current_xp": 35400,
    "fighters": {
      "fighter_id": 4,
      "img_back": "./assets/img/vegeta-back.gif",
      "img_front": "./assets/img/vegeta-front.gif",
      "name": "Vegeta",
      "price": 100
    },
    "name": "Vegeta",
    "img_back": "./assets/img/vegeta-back.gif",
    "img_front": "./assets/img/vegeta-front.gif",
    "attack": 1734,
    "special_attack": 1680,
    "defense": 1753,
    "special_defense": 1679,
    "accuracy": 76,
    "max_hp": 17399,
    "current_hp": 17399,
    "moves": [
      {
        "user_fighter_move_id": 76,
        "move_id": 4,
        "user_fighter_id": 30,
        "current_xp": 8851,
        "level": 10,
        "movelevel_id": 580,
        "selected": 1,
        "img": "./assets/img/blueSlash.gif",
        "name": "Punch",
        "sfx": "/assets/sounds/SFX/vegeta-take-this.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 282,
            "move_id": 4,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -1050,
            "level": 10,
            "movelevel_id": 580
          }
        ]
      },
      {
        "user_fighter_move_id": 77,
        "move_id": 23,
        "user_fighter_id": 30,
        "current_xp": 8851,
        "level": 10,
        "movelevel_id": 581,
        "selected": 1,
        "img": "./assets/img/aura.gif",
        "name": "Power Up",
        "sfx": "/assets/sounds/SFX/vegeta-ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 436,
            "move_id": 23,
            "attack_type": "special",
            "field": "extra_attack",
            "inflicted_on": "user",
            "value": 1050,
            "level": 10,
            "movelevel_id": 581
          }
        ]
      },
      {
        "user_fighter_move_id": 78,
        "move_id": 24,
        "user_fighter_id": 30,
        "current_xp": 8851,
        "level": 10,
        "movelevel_id": 582,
        "selected": 1,
        "img": "./assets/img/aura.gif",
        "name": "Sp Power Up",
        "sfx": "/assets/sounds/SFX/vegeta-ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 437,
            "move_id": 24,
            "attack_type": "special",
            "field": "extra_special_attack",
            "inflicted_on": "user",
            "value": 1200,
            "level": 10,
            "movelevel_id": 582
          }
        ]
      },
      {
        "user_fighter_move_id": 79,
        "move_id": 25,
        "user_fighter_id": 30,
        "current_xp": 8851,
        "level": 10,
        "movelevel_id": 583,
        "selected": 1,
        "img": "./assets/img/ray.gif",
        "name": "Final Blast",
        "sfx": "/assets/sounds/SFX/Resplandor.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 296,
            "move_id": 25,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -1200,
            "level": 10,
            "movelevel_id": 583
          }
        ]
      }
    ]
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
    "name": "Ikki",
    "img_back": "./assets/img/Ikki-back.gif",
    "img_front": "./assets/img/Ikki-front.gif",
    "attack": 1117,
    "special_attack": 1149,
    "defense": 1127,
    "special_defense": 1106,
    "accuracy": 65,
    "max_hp": 11210,
    "current_hp": 11210,
    "moves": [
      {
        "user_fighter_move_id": 80,
        "move_id": 7,
        "user_fighter_id": 31,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 25,
        "selected": 1,
        "img": "./assets/img/phoenix.gif",
        "name": "Ave Fénix",
        "sfx": "/assets/sounds/SFX/Phoenix2.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 7,
            "move_id": 7,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -300,
            "level": 1,
            "movelevel_id": 25
          }
        ]
      },
      {
        "user_fighter_move_id": 81,
        "move_id": 26,
        "user_fighter_id": 31,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 26,
        "selected": 1,
        "img": "./assets/img/lightBeam.gif",
        "name": "Puño Fantasma",
        "sfx": "/assets/sounds/SFX/Phoenix3.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 27,
            "move_id": 26,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -300,
            "level": 1,
            "movelevel_id": 26
          }
        ]
      },
      {
        "user_fighter_move_id": 82,
        "move_id": 27,
        "user_fighter_id": 31,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 27,
        "selected": 1,
        "img": "./assets/img/resurgir.gif",
        "name": "Resurgir",
        "sfx": "/assets/sounds/SFX/Resurgir.mp3",
        "mp": 10,
        "actionmoves": [
          {
            "action_move_id": 28,
            "move_id": 27,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "user",
            "value": 40,
            "level": 1,
            "movelevel_id": 27
          }
        ]
      },
      {
        "user_fighter_move_id": 83,
        "move_id": 28,
        "user_fighter_id": 31,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 28,
        "selected": 1,
        "img": "./assets/img/electric-aura.gif",
        "name": "Séptimo Sentido",
        "sfx": "/assets/sounds/SFX/Phoenix2.mp3",
        "mp": 5,
        "actionmoves": [
          {
            "action_move_id": 29,
            "move_id": 28,
            "attack_type": "special",
            "field": "extra_special_attack",
            "inflicted_on": "user",
            "value": 300,
            "level": 1,
            "movelevel_id": 28
          }
        ]
      }
    ]
  },
  {
    "user_fighter_id": 32,
    "user_id": 7,
    "fighter_id": 3,
    "level": 13,
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
    "current_xp": 18700,
    "fighters": {
      "fighter_id": 3,
      "img_back": "./assets/img/goku.png",
      "img_front": "/assets/img/goku-front.png",
      "name": "Goku",
      "price": 100
    },
    "name": "Goku",
    "img_back": "./assets/img/goku.png",
    "img_front": "/assets/img/goku-front.png",
    "attack": 1242,
    "special_attack": 1249,
    "defense": 1189,
    "special_defense": 1212,
    "accuracy": 73,
    "max_hp": 12298,
    "current_hp": 12298,
    "moves": [
      {
        "user_fighter_move_id": 84,
        "move_id": 3,
        "user_fighter_id": 32,
        "current_xp": 27051,
        "level": 10,
        "movelevel_id": 576,
        "selected": 1,
        "img": "./assets/img/blueSlash.gif",
        "name": "Bite",
        "sfx": "/assets/sounds/SFX/Ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 281,
            "move_id": 3,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -1500,
            "level": 10,
            "movelevel_id": 576
          }
        ]
      },
      {
        "user_fighter_move_id": 85,
        "move_id": 11,
        "user_fighter_id": 32,
        "current_xp": 27051,
        "level": 10,
        "movelevel_id": 577,
        "selected": 0,
        "img": "./assets/img/kameha.gif",
        "name": "Kame Hame Ha",
        "sfx": "/assets/sounds/SFX/Ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 288,
            "move_id": 11,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -1350,
            "level": 10,
            "movelevel_id": 577
          }
        ]
      },
      {
        "user_fighter_move_id": 86,
        "move_id": 12,
        "user_fighter_id": 32,
        "current_xp": 27051,
        "level": 10,
        "movelevel_id": 578,
        "selected": 1,
        "img": "./assets/img/aura.gif",
        "name": "Kaioken",
        "sfx": "/assets/sounds/SFX/Ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 431,
            "move_id": 12,
            "attack_type": "special",
            "field": "extra_attack",
            "inflicted_on": "user",
            "value": 1050,
            "level": 10,
            "movelevel_id": 578
          }
        ]
      },
      {
        "user_fighter_move_id": 87,
        "move_id": 13,
        "user_fighter_id": 32,
        "current_xp": 27051,
        "level": 10,
        "movelevel_id": 579,
        "selected": 0,
        "img": "./assets/img/aura.gif",
        "name": "Kaioken(X2)",
        "sfx": "/assets/sounds/SFX/Ha.mp3",
        "mp": 10,
        "actionmoves": [
          {
            "action_move_id": 432,
            "move_id": 13,
            "attack_type": "special",
            "field": "attack_multiplier",
            "inflicted_on": "user",
            "value": 1,
            "level": 10,
            "movelevel_id": 579
          }
        ]
      },
      {
        "user_fighter_move_id": 116,
        "move_id": 3,
        "user_fighter_id": 32,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 9,
        "selected": 1,
        "img": "./assets/img/blueSlash.gif",
        "name": "Bite",
        "sfx": "/assets/sounds/SFX/Ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 3,
            "move_id": 3,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -500,
            "level": 1,
            "movelevel_id": 9
          }
        ]
      },
      {
        "user_fighter_move_id": 117,
        "move_id": 11,
        "user_fighter_id": 32,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 10,
        "selected": 0,
        "img": "./assets/img/kameha.gif",
        "name": "Kame Hame Ha",
        "sfx": "/assets/sounds/SFX/Ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 11,
            "move_id": 11,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -350,
            "level": 1,
            "movelevel_id": 10
          }
        ]
      }
    ]
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
    "name": "Mew",
    "img_back": "./assets/img/mew-back.png",
    "img_front": "./assets/img/mew-front.png",
    "attack": 1407,
    "special_attack": 1397,
    "defense": 1397,
    "special_defense": 1382,
    "accuracy": 76,
    "max_hp": 14286,
    "current_hp": 14286,
    "moves": [
      {
        "user_fighter_move_id": 88,
        "move_id": 5,
        "user_fighter_id": 33,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 17,
        "selected": 1,
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
            "value": -150,
            "level": 1,
            "movelevel_id": 17
          }
        ]
      },
      {
        "user_fighter_move_id": 89,
        "move_id": 14,
        "user_fighter_id": 33,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 18,
        "selected": 1,
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
        "user_fighter_move_id": 90,
        "move_id": 15,
        "user_fighter_id": 33,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 19,
        "selected": 1,
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
        "user_fighter_move_id": 91,
        "move_id": 16,
        "user_fighter_id": 33,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 20,
        "selected": 1,
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
    "name": "Michael",
    "img_back": "./assets/img/michael3.gif",
    "img_front": "./assets/img/michael-front.gif",
    "attack": 246,
    "special_attack": 242,
    "defense": 227,
    "special_defense": 294,
    "accuracy": 65,
    "max_hp": 2253,
    "current_hp": 2253,
    "moves": [
      {
        "user_fighter_move_id": 92,
        "move_id": 6,
        "user_fighter_id": 34,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 21,
        "selected": 1,
        "img": "./assets/img/redSlash.gif",
        "name": "Dance Moves",
        "sfx": "/assets/sounds/SFX/MichaelKick.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 6,
            "move_id": 6,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -250,
            "level": 1,
            "movelevel_id": 21
          }
        ]
      },
      {
        "user_fighter_move_id": 93,
        "move_id": 20,
        "user_fighter_id": 34,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 22,
        "selected": 1,
        "img": "/assets/img/5Xyg.gif",
        "name": "Shine",
        "sfx": "/assets/sounds/SFX/HeeHeeHee.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 21,
            "move_id": 20,
            "attack_type": "normal",
            "field": "extra_special_defense",
            "inflicted_on": "user",
            "value": 200,
            "level": 1,
            "movelevel_id": 22
          }
        ]
      },
      {
        "user_fighter_move_id": 94,
        "move_id": 21,
        "user_fighter_id": 34,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 23,
        "selected": 1,
        "img": "./assets/img/ayuwoki.gif",
        "name": "Ayuwoki",
        "sfx": "/assets/sounds/SFX/Ayuwoki.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 22,
            "move_id": 21,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -200,
            "level": 1,
            "movelevel_id": 23
          }
        ]
      },
      {
        "user_fighter_move_id": 95,
        "move_id": 22,
        "user_fighter_id": 34,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 24,
        "selected": 1,
        "img": "./assets/img/moonWalk.gif",
        "name": "Moon Walk",
        "sfx": "/assets/sounds/SFX/MoonWalk.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 23,
            "move_id": 22,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -300,
            "level": 1,
            "movelevel_id": 24
          }
        ]
      }
    ]
  },
  {
    "user_fighter_id": 35,
    "user_id": 7,
    "fighter_id": 8,
    "level": 12,
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
    "current_xp": 14800,
    "fighters": {
      "fighter_id": 8,
      "img_back": "./assets/img/venom-back.gif",
      "img_front": "./assets/img/venom-front.gif",
      "name": "Venom",
      "price": 999999
    },
    "name": "Venom",
    "img_back": "./assets/img/venom-back.gif",
    "img_front": "./assets/img/venom-front.gif",
    "attack": 1122,
    "special_attack": 1227,
    "defense": 1142,
    "special_defense": 1094,
    "accuracy": 65,
    "max_hp": 11366,
    "current_hp": 11366,
    "moves": [
      {
        "user_fighter_move_id": 96,
        "move_id": 29,
        "user_fighter_id": 35,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 29,
        "selected": 1,
        "img": "./assets/img/spider-web.gif",
        "name": "Spider Web",
        "sfx": "/assets/sounds/SFX/venom.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 30,
            "move_id": 29,
            "attack_type": "normal",
            "field": "accuracy",
            "inflicted_on": "enemy",
            "value": -10,
            "level": 1,
            "movelevel_id": 29
          }
        ]
      },
      {
        "user_fighter_move_id": 97,
        "move_id": 30,
        "user_fighter_id": 35,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 30,
        "selected": 1,
        "img": "./assets/img/poison.gif",
        "name": "Venom Spit",
        "sfx": "/assets/sounds/SFX/venom.mp3",
        "mp": 15,
        "actionmoves": [
          {
            "action_move_id": 31,
            "move_id": 30,
            "attack_type": "normal",
            "field": "extra_special_defense",
            "inflicted_on": "enemy",
            "value": -500,
            "level": 1,
            "movelevel_id": 30
          }
        ]
      },
      {
        "user_fighter_move_id": 98,
        "move_id": 31,
        "user_fighter_id": 35,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 31,
        "selected": 1,
        "img": "./assets/img/mutation.gif",
        "name": "Mutation",
        "sfx": "/assets/sounds/SFX/venom2.mp3",
        "mp": 15,
        "actionmoves": [
          {
            "action_move_id": 32,
            "move_id": 31,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -500,
            "level": 1,
            "movelevel_id": 31
          }
        ]
      },
      {
        "user_fighter_move_id": 99,
        "move_id": 32,
        "user_fighter_id": 35,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 32,
        "selected": 1,
        "img": "./assets/img/mutation.gif",
        "name": "Heal",
        "sfx": "/assets/sounds/SFX/venom2.mp3",
        "mp": 15,
        "actionmoves": [
          {
            "action_move_id": 33,
            "move_id": 32,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "user",
            "value": 20,
            "level": 1,
            "movelevel_id": 32
          }
        ]
      }
    ]
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
    "name": "Joker",
    "img_back": "./assets/img/joker-back.gif",
    "img_front": "./assets/img/joker-front.gif",
    "attack": 762,
    "special_attack": 806,
    "defense": 767,
    "special_defense": 712,
    "accuracy": 65,
    "max_hp": 7411,
    "current_hp": 7411,
    "moves": [
      {
        "user_fighter_move_id": 100,
        "move_id": 33,
        "user_fighter_id": 36,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 33,
        "selected": 1,
        "img": "./assets/img/YQDj.gif",
        "name": "Bomb Throw",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 34,
            "move_id": 33,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -400,
            "level": 1,
            "movelevel_id": 33
          }
        ]
      },
      {
        "user_fighter_move_id": 101,
        "move_id": 34,
        "user_fighter_id": 36,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 34,
        "selected": 1,
        "img": "./assets/img/hahaha.gif",
        "name": "Ha Ha Ha",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 15,
        "actionmoves": [
          {
            "action_move_id": 35,
            "move_id": 34,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "user",
            "value": 500,
            "level": 1,
            "movelevel_id": 34
          }
        ]
      },
      {
        "user_fighter_move_id": 102,
        "move_id": 35,
        "user_fighter_id": 36,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 35,
        "selected": 1,
        "img": "./assets/img/joker-card.gif",
        "name": "Card trick",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 36,
            "move_id": 35,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "enemy",
            "value": -400,
            "level": 1,
            "movelevel_id": 35
          }
        ]
      },
      {
        "user_fighter_move_id": 103,
        "move_id": 36,
        "user_fighter_id": 36,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 36,
        "selected": 1,
        "img": "./assets/img/YQDj.gif",
        "name": "Joke's on you",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 37,
            "move_id": 36,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "user",
            "value": 80,
            "level": 1,
            "movelevel_id": 36
          }
        ]
      }
    ]
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
    "name": "Joker",
    "img_back": "./assets/img/joker-back.gif",
    "img_front": "./assets/img/joker-front.gif",
    "attack": 52,
    "special_attack": 30,
    "defense": 30,
    "special_defense": 79,
    "accuracy": 65,
    "max_hp": 361,
    "current_hp": 361,
    "moves": [
      {
        "user_fighter_move_id": 104,
        "move_id": 33,
        "user_fighter_id": 37,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 33,
        "selected": 1,
        "img": "./assets/img/YQDj.gif",
        "name": "Bomb Throw",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 34,
            "move_id": 33,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -400,
            "level": 1,
            "movelevel_id": 33
          }
        ]
      },
      {
        "user_fighter_move_id": 105,
        "move_id": 34,
        "user_fighter_id": 37,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 34,
        "selected": 1,
        "img": "./assets/img/hahaha.gif",
        "name": "Ha Ha Ha",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 15,
        "actionmoves": [
          {
            "action_move_id": 35,
            "move_id": 34,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "user",
            "value": 500,
            "level": 1,
            "movelevel_id": 34
          }
        ]
      },
      {
        "user_fighter_move_id": 106,
        "move_id": 35,
        "user_fighter_id": 37,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 35,
        "selected": 1,
        "img": "./assets/img/joker-card.gif",
        "name": "Card trick",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 36,
            "move_id": 35,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "enemy",
            "value": -400,
            "level": 1,
            "movelevel_id": 35
          }
        ]
      },
      {
        "user_fighter_move_id": 107,
        "move_id": 36,
        "user_fighter_id": 37,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 36,
        "selected": 1,
        "img": "./assets/img/YQDj.gif",
        "name": "Joke's on you",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 37,
            "move_id": 36,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "user",
            "value": 80,
            "level": 1,
            "movelevel_id": 36
          }
        ]
      }
    ]
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
    "name": "Ikki",
    "img_back": "./assets/img/Ikki-back.gif",
    "img_front": "./assets/img/Ikki-front.gif",
    "attack": 18,
    "special_attack": 53,
    "defense": 33,
    "special_defense": 97,
    "accuracy": 65,
    "max_hp": 219,
    "current_hp": 219,
    "moves": [
      {
        "user_fighter_move_id": 133,
        "move_id": 7,
        "user_fighter_id": 51,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 25,
        "selected": 1,
        "img": "./assets/img/phoenix.gif",
        "name": "Ave Fénix",
        "sfx": "/assets/sounds/SFX/Phoenix2.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 7,
            "move_id": 7,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -300,
            "level": 1,
            "movelevel_id": 25
          }
        ]
      }
    ]
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
    "name": "Ikki",
    "img_back": "./assets/img/Ikki-back.gif",
    "img_front": "./assets/img/Ikki-front.gif",
    "attack": 18,
    "special_attack": 53,
    "defense": 33,
    "special_defense": 97,
    "accuracy": 65,
    "max_hp": 219,
    "current_hp": 219,
    "moves": [
      {
        "user_fighter_move_id": 134,
        "move_id": 7,
        "user_fighter_id": 52,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 25,
        "selected": 1,
        "img": "./assets/img/phoenix.gif",
        "name": "Ave Fénix",
        "sfx": "/assets/sounds/SFX/Phoenix2.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 7,
            "move_id": 7,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -300,
            "level": 1,
            "movelevel_id": 25
          }
        ]
      }
    ]
  }
]
const fighters = [
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
    "name": "Charizard",
    "img_back": "./assets/img/charizard-back.png",
    "img_front": "./assets/img/charizard-front.gif",
    "attack": 296,
    "special_attack": 308,
    "defense": 264,
    "special_defense": 259,
    "accuracy": 65,
    "max_hp": 2261,
    "current_hp": 2261,
    "moves": [
      {
        "user_fighter_move_id": 65,
        "move_id": 1,
        "user_fighter_id": 6,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 1,
        "selected": 1,
        "img": "./assets/img/fire.png",
        "name": "Flame",
        "sfx": "/assets/sounds/SFX/CharizardFlame.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 1,
            "move_id": 1,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -150,
            "level": 1,
            "movelevel_id": 1
          }
        ]
      },
      {
        "user_fighter_move_id": 66,
        "move_id": 8,
        "user_fighter_id": 6,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 2,
        "selected": 1,
        "img": "./assets/img/redSlash.gif",
        "name": "Punch",
        "sfx": "/assets/sounds/SFX/CharizardPunch.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 8,
            "move_id": 8,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -100,
            "level": 1,
            "movelevel_id": 2
          }
        ]
      },
      {
        "user_fighter_move_id": 67,
        "move_id": 9,
        "user_fighter_id": 6,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 3,
        "selected": 1,
        "img": "./assets/img/aura.gif",
        "name": "Roar",
        "sfx": "/assets/sounds/SFX/CharizardDefUp.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 9,
            "move_id": 9,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "user",
            "value": 30,
            "level": 1,
            "movelevel_id": 3
          }
        ]
      },
      {
        "user_fighter_move_id": 68,
        "move_id": 10,
        "user_fighter_id": 6,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 4,
        "selected": 1,
        "img": "./assets/img/ray.gif",
        "name": "Hiper Ray",
        "sfx": "/assets/sounds/SFX/CharizardHiperRay.mp3",
        "mp": 6,
        "actionmoves": [
          {
            "action_move_id": 10,
            "move_id": 10,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -500,
            "level": 1,
            "movelevel_id": 4
          }
        ]
      }
    ]
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
    "name": "Batman",
    "img_back": "./assets/img/batman-back.png",
    "img_front": "./assets/img/batman-front.png",
    "attack": 174,
    "special_attack": 197,
    "defense": 205,
    "special_defense": 146,
    "accuracy": 65,
    "max_hp": 1225,
    "current_hp": 1225,
    "moves": [
      {
        "user_fighter_move_id": 72,
        "move_id": 2,
        "user_fighter_id": 29,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 5,
        "selected": 1,
        "img": "./assets/img/redSlash.gif",
        "name": "Boomerang Throw",
        "sfx": "/assets/sounds/SFX/batflap.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 2,
            "move_id": 2,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -200,
            "level": 1,
            "movelevel_id": 5
          }
        ]
      },
      {
        "user_fighter_move_id": 73,
        "move_id": 17,
        "user_fighter_id": 29,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 6,
        "selected": 1,
        "img": "./assets/img/moneyThrow.gif",
        "name": "I'm BATMAN",
        "sfx": "/assets/sounds/SFX/imbatman.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 17,
            "move_id": 17,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "enemy",
            "value": -250,
            "level": 1,
            "movelevel_id": 6
          },
          {
            "action_move_id": 18,
            "move_id": 17,
            "attack_type": "normal",
            "field": "extra_special_defense",
            "inflicted_on": "enemy",
            "value": -250,
            "level": 1,
            "movelevel_id": 6
          }
        ]
      },
      {
        "user_fighter_move_id": 74,
        "move_id": 18,
        "user_fighter_id": 29,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 7,
        "selected": 1,
        "img": "./assets/img/2eSd.gif",
        "name": "Cape Cover",
        "sfx": "/assets/sounds/SFX/batflap.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 19,
            "move_id": 18,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "user",
            "value": 400,
            "level": 1,
            "movelevel_id": 7
          }
        ]
      },
      {
        "user_fighter_move_id": 75,
        "move_id": 19,
        "user_fighter_id": 29,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 8,
        "selected": 1,
        "img": "./assets/img/bat.gif",
        "name": "BatiBat",
        "sfx": "/assets/sounds/SFX/batflap.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 20,
            "move_id": 19,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -350,
            "level": 1,
            "movelevel_id": 8
          }
        ]
      }
    ]
  },
  {
    "user_fighter_id": 30,
    "user_id": 7,
    "fighter_id": 4,
    "level": 18,
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
    "current_xp": 35400,
    "fighters": {
      "fighter_id": 4,
      "img_back": "./assets/img/vegeta-back.gif",
      "img_front": "./assets/img/vegeta-front.gif",
      "name": "Vegeta",
      "price": 100
    },
    "name": "Vegeta",
    "img_back": "./assets/img/vegeta-back.gif",
    "img_front": "./assets/img/vegeta-front.gif",
    "attack": 1734,
    "special_attack": 1680,
    "defense": 1753,
    "special_defense": 1679,
    "accuracy": 76,
    "max_hp": 17399,
    "current_hp": 17399,
    "moves": [
      {
        "user_fighter_move_id": 76,
        "move_id": 4,
        "user_fighter_id": 30,
        "current_xp": 8851,
        "level": 10,
        "movelevel_id": 580,
        "selected": 1,
        "img": "./assets/img/blueSlash.gif",
        "name": "Punch",
        "sfx": "/assets/sounds/SFX/vegeta-take-this.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 282,
            "move_id": 4,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -1050,
            "level": 10,
            "movelevel_id": 580
          }
        ]
      },
      {
        "user_fighter_move_id": 77,
        "move_id": 23,
        "user_fighter_id": 30,
        "current_xp": 8851,
        "level": 10,
        "movelevel_id": 581,
        "selected": 1,
        "img": "./assets/img/aura.gif",
        "name": "Power Up",
        "sfx": "/assets/sounds/SFX/vegeta-ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 436,
            "move_id": 23,
            "attack_type": "special",
            "field": "extra_attack",
            "inflicted_on": "user",
            "value": 1050,
            "level": 10,
            "movelevel_id": 581
          }
        ]
      },
      {
        "user_fighter_move_id": 78,
        "move_id": 24,
        "user_fighter_id": 30,
        "current_xp": 8851,
        "level": 10,
        "movelevel_id": 582,
        "selected": 1,
        "img": "./assets/img/aura.gif",
        "name": "Sp Power Up",
        "sfx": "/assets/sounds/SFX/vegeta-ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 437,
            "move_id": 24,
            "attack_type": "special",
            "field": "extra_special_attack",
            "inflicted_on": "user",
            "value": 1200,
            "level": 10,
            "movelevel_id": 582
          }
        ]
      },
      {
        "user_fighter_move_id": 79,
        "move_id": 25,
        "user_fighter_id": 30,
        "current_xp": 8851,
        "level": 10,
        "movelevel_id": 583,
        "selected": 1,
        "img": "./assets/img/ray.gif",
        "name": "Final Blast",
        "sfx": "/assets/sounds/SFX/Resplandor.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 296,
            "move_id": 25,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -1200,
            "level": 10,
            "movelevel_id": 583
          }
        ]
      }
    ]
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
    "name": "Ikki",
    "img_back": "./assets/img/Ikki-back.gif",
    "img_front": "./assets/img/Ikki-front.gif",
    "attack": 1117,
    "special_attack": 1149,
    "defense": 1127,
    "special_defense": 1106,
    "accuracy": 65,
    "max_hp": 11210,
    "current_hp": 11210,
    "moves": [
      {
        "user_fighter_move_id": 80,
        "move_id": 7,
        "user_fighter_id": 31,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 25,
        "selected": 1,
        "img": "./assets/img/phoenix.gif",
        "name": "Ave Fénix",
        "sfx": "/assets/sounds/SFX/Phoenix2.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 7,
            "move_id": 7,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -300,
            "level": 1,
            "movelevel_id": 25
          }
        ]
      },
      {
        "user_fighter_move_id": 81,
        "move_id": 26,
        "user_fighter_id": 31,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 26,
        "selected": 1,
        "img": "./assets/img/lightBeam.gif",
        "name": "Puño Fantasma",
        "sfx": "/assets/sounds/SFX/Phoenix3.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 27,
            "move_id": 26,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -300,
            "level": 1,
            "movelevel_id": 26
          }
        ]
      },
      {
        "user_fighter_move_id": 82,
        "move_id": 27,
        "user_fighter_id": 31,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 27,
        "selected": 1,
        "img": "./assets/img/resurgir.gif",
        "name": "Resurgir",
        "sfx": "/assets/sounds/SFX/Resurgir.mp3",
        "mp": 10,
        "actionmoves": [
          {
            "action_move_id": 28,
            "move_id": 27,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "user",
            "value": 40,
            "level": 1,
            "movelevel_id": 27
          }
        ]
      },
      {
        "user_fighter_move_id": 83,
        "move_id": 28,
        "user_fighter_id": 31,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 28,
        "selected": 1,
        "img": "./assets/img/electric-aura.gif",
        "name": "Séptimo Sentido",
        "sfx": "/assets/sounds/SFX/Phoenix2.mp3",
        "mp": 5,
        "actionmoves": [
          {
            "action_move_id": 29,
            "move_id": 28,
            "attack_type": "special",
            "field": "extra_special_attack",
            "inflicted_on": "user",
            "value": 300,
            "level": 1,
            "movelevel_id": 28
          }
        ]
      }
    ]
  },
  {
    "user_fighter_id": 32,
    "user_id": 7,
    "fighter_id": 3,
    "level": 13,
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
    "current_xp": 18700,
    "fighters": {
      "fighter_id": 3,
      "img_back": "./assets/img/goku.png",
      "img_front": "/assets/img/goku-front.png",
      "name": "Goku",
      "price": 100
    },
    "name": "Goku",
    "img_back": "./assets/img/goku.png",
    "img_front": "/assets/img/goku-front.png",
    "attack": 1242,
    "special_attack": 1249,
    "defense": 1189,
    "special_defense": 1212,
    "accuracy": 73,
    "max_hp": 12298,
    "current_hp": 12298,
    "moves": [
      {
        "user_fighter_move_id": 84,
        "move_id": 3,
        "user_fighter_id": 32,
        "current_xp": 27051,
        "level": 10,
        "movelevel_id": 576,
        "selected": 1,
        "img": "./assets/img/blueSlash.gif",
        "name": "Bite",
        "sfx": "/assets/sounds/SFX/Ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 281,
            "move_id": 3,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -1500,
            "level": 10,
            "movelevel_id": 576
          }
        ]
      },
      {
        "user_fighter_move_id": 85,
        "move_id": 11,
        "user_fighter_id": 32,
        "current_xp": 27051,
        "level": 10,
        "movelevel_id": 577,
        "selected": 0,
        "img": "./assets/img/kameha.gif",
        "name": "Kame Hame Ha",
        "sfx": "/assets/sounds/SFX/Ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 288,
            "move_id": 11,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -1350,
            "level": 10,
            "movelevel_id": 577
          }
        ]
      },
      {
        "user_fighter_move_id": 86,
        "move_id": 12,
        "user_fighter_id": 32,
        "current_xp": 27051,
        "level": 10,
        "movelevel_id": 578,
        "selected": 1,
        "img": "./assets/img/aura.gif",
        "name": "Kaioken",
        "sfx": "/assets/sounds/SFX/Ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 431,
            "move_id": 12,
            "attack_type": "special",
            "field": "extra_attack",
            "inflicted_on": "user",
            "value": 1050,
            "level": 10,
            "movelevel_id": 578
          }
        ]
      },
      {
        "user_fighter_move_id": 87,
        "move_id": 13,
        "user_fighter_id": 32,
        "current_xp": 27051,
        "level": 10,
        "movelevel_id": 579,
        "selected": 0,
        "img": "./assets/img/aura.gif",
        "name": "Kaioken(X2)",
        "sfx": "/assets/sounds/SFX/Ha.mp3",
        "mp": 10,
        "actionmoves": [
          {
            "action_move_id": 432,
            "move_id": 13,
            "attack_type": "special",
            "field": "attack_multiplier",
            "inflicted_on": "user",
            "value": 1,
            "level": 10,
            "movelevel_id": 579
          }
        ]
      },
      {
        "user_fighter_move_id": 116,
        "move_id": 3,
        "user_fighter_id": 32,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 9,
        "selected": 1,
        "img": "./assets/img/blueSlash.gif",
        "name": "Bite",
        "sfx": "/assets/sounds/SFX/Ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 3,
            "move_id": 3,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -500,
            "level": 1,
            "movelevel_id": 9
          }
        ]
      },
      {
        "user_fighter_move_id": 117,
        "move_id": 11,
        "user_fighter_id": 32,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 10,
        "selected": 0,
        "img": "./assets/img/kameha.gif",
        "name": "Kame Hame Ha",
        "sfx": "/assets/sounds/SFX/Ha.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 11,
            "move_id": 11,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -350,
            "level": 1,
            "movelevel_id": 10
          }
        ]
      }
    ]
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
    "name": "Mew",
    "img_back": "./assets/img/mew-back.png",
    "img_front": "./assets/img/mew-front.png",
    "attack": 1407,
    "special_attack": 1397,
    "defense": 1397,
    "special_defense": 1382,
    "accuracy": 76,
    "max_hp": 14286,
    "current_hp": 14286,
    "moves": [
      {
        "user_fighter_move_id": 88,
        "move_id": 5,
        "user_fighter_id": 33,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 17,
        "selected": 1,
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
            "value": -150,
            "level": 1,
            "movelevel_id": 17
          }
        ]
      },
      {
        "user_fighter_move_id": 89,
        "move_id": 14,
        "user_fighter_id": 33,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 18,
        "selected": 1,
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
        "user_fighter_move_id": 90,
        "move_id": 15,
        "user_fighter_id": 33,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 19,
        "selected": 1,
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
        "user_fighter_move_id": 91,
        "move_id": 16,
        "user_fighter_id": 33,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 20,
        "selected": 1,
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
    "name": "Michael",
    "img_back": "./assets/img/michael3.gif",
    "img_front": "./assets/img/michael-front.gif",
    "attack": 246,
    "special_attack": 242,
    "defense": 227,
    "special_defense": 294,
    "accuracy": 65,
    "max_hp": 2253,
    "current_hp": 2253,
    "moves": [
      {
        "user_fighter_move_id": 92,
        "move_id": 6,
        "user_fighter_id": 34,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 21,
        "selected": 1,
        "img": "./assets/img/redSlash.gif",
        "name": "Dance Moves",
        "sfx": "/assets/sounds/SFX/MichaelKick.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 6,
            "move_id": 6,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -250,
            "level": 1,
            "movelevel_id": 21
          }
        ]
      },
      {
        "user_fighter_move_id": 93,
        "move_id": 20,
        "user_fighter_id": 34,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 22,
        "selected": 1,
        "img": "/assets/img/5Xyg.gif",
        "name": "Shine",
        "sfx": "/assets/sounds/SFX/HeeHeeHee.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 21,
            "move_id": 20,
            "attack_type": "normal",
            "field": "extra_special_defense",
            "inflicted_on": "user",
            "value": 200,
            "level": 1,
            "movelevel_id": 22
          }
        ]
      },
      {
        "user_fighter_move_id": 94,
        "move_id": 21,
        "user_fighter_id": 34,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 23,
        "selected": 1,
        "img": "./assets/img/ayuwoki.gif",
        "name": "Ayuwoki",
        "sfx": "/assets/sounds/SFX/Ayuwoki.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 22,
            "move_id": 21,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -200,
            "level": 1,
            "movelevel_id": 23
          }
        ]
      },
      {
        "user_fighter_move_id": 95,
        "move_id": 22,
        "user_fighter_id": 34,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 24,
        "selected": 1,
        "img": "./assets/img/moonWalk.gif",
        "name": "Moon Walk",
        "sfx": "/assets/sounds/SFX/MoonWalk.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 23,
            "move_id": 22,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -300,
            "level": 1,
            "movelevel_id": 24
          }
        ]
      }
    ]
  },
  {
    "user_fighter_id": 35,
    "user_id": 7,
    "fighter_id": 8,
    "level": 12,
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
    "current_xp": 14800,
    "fighters": {
      "fighter_id": 8,
      "img_back": "./assets/img/venom-back.gif",
      "img_front": "./assets/img/venom-front.gif",
      "name": "Venom",
      "price": 999999
    },
    "name": "Venom",
    "img_back": "./assets/img/venom-back.gif",
    "img_front": "./assets/img/venom-front.gif",
    "attack": 1122,
    "special_attack": 1227,
    "defense": 1142,
    "special_defense": 1094,
    "accuracy": 65,
    "max_hp": 11366,
    "current_hp": 11366,
    "moves": [
      {
        "user_fighter_move_id": 96,
        "move_id": 29,
        "user_fighter_id": 35,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 29,
        "selected": 1,
        "img": "./assets/img/spider-web.gif",
        "name": "Spider Web",
        "sfx": "/assets/sounds/SFX/venom.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 30,
            "move_id": 29,
            "attack_type": "normal",
            "field": "accuracy",
            "inflicted_on": "enemy",
            "value": -10,
            "level": 1,
            "movelevel_id": 29
          }
        ]
      },
      {
        "user_fighter_move_id": 97,
        "move_id": 30,
        "user_fighter_id": 35,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 30,
        "selected": 1,
        "img": "./assets/img/poison.gif",
        "name": "Venom Spit",
        "sfx": "/assets/sounds/SFX/venom.mp3",
        "mp": 15,
        "actionmoves": [
          {
            "action_move_id": 31,
            "move_id": 30,
            "attack_type": "normal",
            "field": "extra_special_defense",
            "inflicted_on": "enemy",
            "value": -500,
            "level": 1,
            "movelevel_id": 30
          }
        ]
      },
      {
        "user_fighter_move_id": 98,
        "move_id": 31,
        "user_fighter_id": 35,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 31,
        "selected": 1,
        "img": "./assets/img/mutation.gif",
        "name": "Mutation",
        "sfx": "/assets/sounds/SFX/venom2.mp3",
        "mp": 15,
        "actionmoves": [
          {
            "action_move_id": 32,
            "move_id": 31,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -500,
            "level": 1,
            "movelevel_id": 31
          }
        ]
      },
      {
        "user_fighter_move_id": 99,
        "move_id": 32,
        "user_fighter_id": 35,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 32,
        "selected": 1,
        "img": "./assets/img/mutation.gif",
        "name": "Heal",
        "sfx": "/assets/sounds/SFX/venom2.mp3",
        "mp": 15,
        "actionmoves": [
          {
            "action_move_id": 33,
            "move_id": 32,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "user",
            "value": 20,
            "level": 1,
            "movelevel_id": 32
          }
        ]
      }
    ]
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
    "name": "Joker",
    "img_back": "./assets/img/joker-back.gif",
    "img_front": "./assets/img/joker-front.gif",
    "attack": 762,
    "special_attack": 806,
    "defense": 767,
    "special_defense": 712,
    "accuracy": 65,
    "max_hp": 7411,
    "current_hp": 7411,
    "moves": [
      {
        "user_fighter_move_id": 100,
        "move_id": 33,
        "user_fighter_id": 36,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 33,
        "selected": 1,
        "img": "./assets/img/YQDj.gif",
        "name": "Bomb Throw",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 34,
            "move_id": 33,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -400,
            "level": 1,
            "movelevel_id": 33
          }
        ]
      },
      {
        "user_fighter_move_id": 101,
        "move_id": 34,
        "user_fighter_id": 36,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 34,
        "selected": 1,
        "img": "./assets/img/hahaha.gif",
        "name": "Ha Ha Ha",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 15,
        "actionmoves": [
          {
            "action_move_id": 35,
            "move_id": 34,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "user",
            "value": 500,
            "level": 1,
            "movelevel_id": 34
          }
        ]
      },
      {
        "user_fighter_move_id": 102,
        "move_id": 35,
        "user_fighter_id": 36,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 35,
        "selected": 1,
        "img": "./assets/img/joker-card.gif",
        "name": "Card trick",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 36,
            "move_id": 35,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "enemy",
            "value": -400,
            "level": 1,
            "movelevel_id": 35
          }
        ]
      },
      {
        "user_fighter_move_id": 103,
        "move_id": 36,
        "user_fighter_id": 36,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 36,
        "selected": 1,
        "img": "./assets/img/YQDj.gif",
        "name": "Joke's on you",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 37,
            "move_id": 36,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "user",
            "value": 80,
            "level": 1,
            "movelevel_id": 36
          }
        ]
      }
    ]
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
    "name": "Joker",
    "img_back": "./assets/img/joker-back.gif",
    "img_front": "./assets/img/joker-front.gif",
    "attack": 52,
    "special_attack": 30,
    "defense": 30,
    "special_defense": 79,
    "accuracy": 65,
    "max_hp": 361,
    "current_hp": 361,
    "moves": [
      {
        "user_fighter_move_id": 104,
        "move_id": 33,
        "user_fighter_id": 37,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 33,
        "selected": 1,
        "img": "./assets/img/YQDj.gif",
        "name": "Bomb Throw",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 34,
            "move_id": 33,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -400,
            "level": 1,
            "movelevel_id": 33
          }
        ]
      },
      {
        "user_fighter_move_id": 105,
        "move_id": 34,
        "user_fighter_id": 37,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 34,
        "selected": 1,
        "img": "./assets/img/hahaha.gif",
        "name": "Ha Ha Ha",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 15,
        "actionmoves": [
          {
            "action_move_id": 35,
            "move_id": 34,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "user",
            "value": 500,
            "level": 1,
            "movelevel_id": 34
          }
        ]
      },
      {
        "user_fighter_move_id": 106,
        "move_id": 35,
        "user_fighter_id": 37,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 35,
        "selected": 1,
        "img": "./assets/img/joker-card.gif",
        "name": "Card trick",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 36,
            "move_id": 35,
            "attack_type": "normal",
            "field": "extra_defense",
            "inflicted_on": "enemy",
            "value": -400,
            "level": 1,
            "movelevel_id": 35
          }
        ]
      },
      {
        "user_fighter_move_id": 107,
        "move_id": 36,
        "user_fighter_id": 37,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 36,
        "selected": 1,
        "img": "./assets/img/YQDj.gif",
        "name": "Joke's on you",
        "sfx": "/assets/sounds/SFX/joker-laugh.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 37,
            "move_id": 36,
            "attack_type": "normal",
            "field": "current_hp",
            "inflicted_on": "user",
            "value": 80,
            "level": 1,
            "movelevel_id": 36
          }
        ]
      }
    ]
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
    "name": "Ikki",
    "img_back": "./assets/img/Ikki-back.gif",
    "img_front": "./assets/img/Ikki-front.gif",
    "attack": 18,
    "special_attack": 53,
    "defense": 33,
    "special_defense": 97,
    "accuracy": 65,
    "max_hp": 219,
    "current_hp": 219,
    "moves": [
      {
        "user_fighter_move_id": 133,
        "move_id": 7,
        "user_fighter_id": 51,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 25,
        "selected": 1,
        "img": "./assets/img/phoenix.gif",
        "name": "Ave Fénix",
        "sfx": "/assets/sounds/SFX/Phoenix2.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 7,
            "move_id": 7,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -300,
            "level": 1,
            "movelevel_id": 25
          }
        ]
      }
    ]
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
    "name": "Ikki",
    "img_back": "./assets/img/Ikki-back.gif",
    "img_front": "./assets/img/Ikki-front.gif",
    "attack": 18,
    "special_attack": 53,
    "defense": 33,
    "special_defense": 97,
    "accuracy": 65,
    "max_hp": 219,
    "current_hp": 219,
    "moves": [
      {
        "user_fighter_move_id": 134,
        "move_id": 7,
        "user_fighter_id": 52,
        "current_xp": 1,
        "level": 1,
        "movelevel_id": 25,
        "selected": 1,
        "img": "./assets/img/phoenix.gif",
        "name": "Ave Fénix",
        "sfx": "/assets/sounds/SFX/Phoenix2.mp3",
        "mp": 20,
        "actionmoves": [
          {
            "action_move_id": 7,
            "move_id": 7,
            "attack_type": "special",
            "field": "current_hp",
            "inflicted_on": "enemy",
            "value": -300,
            "level": 1,
            "movelevel_id": 25
          }
        ]
      }
    ]
  }
]
describe('ShopPage Component', () => {
  // Mock del contexto para la prueba
  const mockContextValue = {
    userContext: {
      user: { user_id: 1 },
      backEndUrl: 'http://example.com/api',
      idUsuario: 1,
      bg: 50,
    },
  };

  let component
  beforeEach(() => {
    // Renderiza FightMenu dentro de MyContextProvider con el contexto simulado

    component = render(
      <>
        <MemoryRouter initialEntries={['/shop']}>
          <I18nextProvider i18n={i18n}>
            <MyContextProvider value={mockContextValue}>
              <ShopPage />
            </MyContextProvider>
          </I18nextProvider>
        </MemoryRouter>
      </>
    );
  });
  test('renders shop page component', () => {
    // Puedes agregar expectativas para asegurarte de que los elementos esperados est�n presentes
    component.getByText(i18n.t('shoppage.main'))
  });
  /*it('handles buy button click for objects', async () => {
  
    // Simula la llamada fetch y espera a que se resuelva
    await waitFor(() => fireEvent.click(component.getByText(i18n.t('shoppage.buy'))))

    // Encuentra el botón "Buy" y haz clic en él


    // Asegúrate de que se muestre el modal y contenga el contenido esperado
    await waitFor(() => expect(component.getByText(/purchase confirmed/i)).toBeInTheDocument());
  });*/
})
