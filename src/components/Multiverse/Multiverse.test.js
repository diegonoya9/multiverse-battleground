import React, { startTransition } from 'react';
import { render, screen, act } from '@testing-library/react';
import { MyContextProvider } from '../../context/MyContext';
import Multiverse from './Multiverse';
// Importa i18next y las funciones necesarias
import i18n from '../../i18n';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

beforeAll(() => {
  i18n.use(initReactI18next)
});
// Mock del contexto para la prueba
const user = [
  {
    "user_id": 15,
    "email": "musica.sinfiltro@gmail.com",
    "password": "googleLogin",
    "name": "Musica Sin Filtro",
    "money": 100,
    "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJOy0rKOKa8o0CNwj2VBGxieZVcRKMBvLhHRmxV1wEwPw=s96-c",
    "google_id": "112583100952773076758",
    "google_picture": "https://lh3.googleusercontent.com/a/ACg8ocJOy0rKOKa8o0CNwj2VBGxieZVcRKMBvLhHRmxV1wEwPw=s96-c",
    "profile": "Player",
    "bg_volume": 61,
    "sound_volume": 25,
    "sfx_volume": 8,
    "userfighters": [
      {
        "user_fighter_id": 46,
        "user_id": 15,
        "fighter_id": 1,
        "level": 7,
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
        "current_xp": 5100,
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
        "user_fighter_id": 48,
        "user_id": 15,
        "fighter_id": 5,
        "level": 10,
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
        "current_xp": 10700,
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
        "user_fighter_id": 49,
        "user_id": 15,
        "fighter_id": 4,
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
        "current_xp": 14600,
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
        "user_fighter_id": 53,
        "user_id": 15,
        "fighter_id": 3,
        "level": 8,
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
        "current_xp": 7700,
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
        "user_fighter_id": 54,
        "user_id": 15,
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
        "user_fighter_id": 55,
        "user_id": 15,
        "fighter_id": 5,
        "level": 9,
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
        "current_xp": 9300,
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
        "user_fighter_id": 56,
        "user_id": 15,
        "fighter_id": 3,
        "level": 29,
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
        "current_xp": 89900,
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
        "user_fighter_id": 64,
        "user_id": 15,
        "fighter_id": 1,
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
        "user_fighter_id": 65,
        "user_id": 15,
        "fighter_id": 2,
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
        "user_fighter_id": 66,
        "user_id": 15,
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
        "user_fighter_id": 67,
        "user_id": 15,
        "fighter_id": 6,
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
        "user_fighter_id": 68,
        "user_id": 15,
        "fighter_id": 3,
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
        "user_fighter_id": 69,
        "user_id": 15,
        "fighter_id": 2,
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
        "user_fighter_id": 70,
        "user_id": 15,
        "fighter_id": 3,
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
          "fighter_id": 3,
          "img_back": "./assets/img/goku.png",
          "img_front": "/assets/img/goku-front.png",
          "name": "Goku",
          "price": 100
        },
        "img_front": "/assets/img/goku-front.png",
        "img_back": "./assets/img/goku.png"
      }
    ],
    "userobjects": [
      {
        "user_object_id": 27,
        "user_id": 15,
        "object_id": 7,
        "quantity": 10790,
        "objects": {
          "name": "Money",
          "description": "Money"
        },
        "name": "Money",
        "description": "Money"
      },
      {
        "user_object_id": 30,
        "user_id": 15,
        "object_id": 3,
        "quantity": 1,
        "objects": {
          "name": "milanesa",
          "description": "Increases user defense by 150"
        },
        "name": "milanesa",
        "description": "Increases user defense by 150"
      },
      {
        "user_object_id": 34,
        "user_id": 15,
        "object_id": 6,
        "quantity": 1,
        "objects": {
          "name": "coffee",
          "description": "Increase special attack by 150"
        },
        "name": "coffee",
        "description": "Increase special attack by 150"
      }
    ]
  }
]
const mockContextValue = {
  userContext: {
    user: user[0],
    backEndUrl: 'http://example.com/api',
    idUsuario: 1,
    bg: 50,
  },
  setUserName: jest.fn(),
  setUser: jest.fn(),
  setSound: jest.fn(),
  setBg: jest.fn(),
  setSfx: jest.fn(),
  setCurrentMission: jest.fn()
};
global.fetch = jest.fn();
test('renders multiverse component', async () => {
  // Renderiza Multiverse dentro de MyContextProvider con el contexto simulado
  fetch
    .mockResolvedValueOnce({ json: () => (user), ok: true })
    .mockResolvedValueOnce({ json: () => (user), ok: true })
    .mockResolvedValueOnce({ json: () => (user), ok: true })
  await act(async () => {
    render(
      <MyContextProvider value={mockContextValue}>
        <MemoryRouter initialEntries={['/']}>
          <I18nextProvider i18n={i18n}>
            <Multiverse />
          </I18nextProvider>
        </MemoryRouter>
      </MyContextProvider>
    );
  });
  screen.findByAltText('mainDiv')
  screen.getByText(i18n.t('multiverse.fight'))
});

it('renders correctly accodring to snapshot', () => {
  const tree = renderer
    .create(
      <MyContextProvider value={mockContextValue}>
        <React.Suspense fallback={<div>Loading...</div>}>
          {/*
            Envuelve la parte que está causando la suspensión con startTransition
          */}
          {startTransition(() => (
            <Multiverse />
          ))}
        </React.Suspense>
      </MyContextProvider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot();
});