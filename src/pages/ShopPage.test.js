// ShopPage.test.js
import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { MyContextProvider } from '../context/MyContext';
import ShopPage from './ShopPage';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { MemoryRouter } from 'react-router-dom';
beforeAll(() => {
  i18n.use(initReactI18next)
});
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
jest.mock('react-audio-player', () => {
  const ReactAudioPlayer = jest.fn();
  ReactAudioPlayer.prototype.play = jest.fn();
  return ReactAudioPlayer;
});
const objects = [
  {
    "object_id": 1,
    "category": "battleItem",
    "description": "Heals the user 2000 HP",
    "img": "./assets/img/potion.png",
    "name": "potion",
    "price": 100,
    "quantity": 1,
    "type": "consumable"
  },
  {
    "object_id": 2,
    "category": "battleItem",
    "description": "Heals the user 5000 HP",
    "img": "./assets/img/potion.png",
    "name": "super_potion",
    "price": 100,
    "quantity": 1,
    "type": "consumable"
  },
  {
    "object_id": 3,
    "category": "battleItem",
    "description": "Increases user defense by 150",
    "img": "./assets/img/milanesa.png",
    "name": "milanesa",
    "price": 100,
    "quantity": 1,
    "type": "consumable"
  },
  {
    "object_id": 4,
    "category": "battleItem",
    "description": "Increases user attack by 100",
    "img": "./assets/img/hardBoiledEgg.png",
    "name": "huevo_duro",
    "price": 100,
    "quantity": 1,
    "type": "consumable"
  },
  {
    "object_id": 5,
    "category": "battleItem",
    "description": "Increase accuracy by 25",
    "img": "./assets/img/potion.png",
    "name": "dopamine",
    "price": 100,
    "quantity": 1,
    "type": "consumable"
  },
  {
    "object_id": 6,
    "category": "battleItem",
    "description": "Increase special attack by 150",
    "img": "./assets/img/coffee.png",
    "name": "coffee",
    "price": 100,
    "quantity": 1,
    "type": "consumable"
  },
  {
    "object_id": 7,
    "category": "userItem",
    "description": "Money",
    "img": "./assets/img/money.png",
    "name": "Money",
    "price": 1,
    "quantity": 1,
    "type": "consumable"
  }
]
const user = [
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
    "bg_volume": 47,
    "sound_volume": 88,
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
          "name": "potion",
          "description": "Heals the user 2000 HP"
        },
        "name": "potion",
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
          "name": "coffee",
          "description": "Increase special attack by 150"
        },
        "name": "coffee",
        "description": "Increase special attack by 150"
      },
      {
        "user_object_id": 16,
        "user_id": 7,
        "object_id": 2,
        "quantity": 8,
        "objects": {
          "name": "super_potion",
          "description": "Heals the user 5000 HP"
        },
        "name": "super_potion",
        "description": "Heals the user 5000 HP"
      },
      {
        "user_object_id": 22,
        "user_id": 7,
        "object_id": 5,
        "quantity": 1,
        "objects": {
          "name": "dopamine",
          "description": "Increase accuracy by 25"
        },
        "name": "dopamine",
        "description": "Increase accuracy by 25"
      },
      {
        "user_object_id": 25,
        "user_id": 7,
        "object_id": 3,
        "quantity": 15052,
        "objects": {
          "name": "milanesa",
          "description": "Increases user defense by 150"
        },
        "name": "milanesa",
        "description": "Increases user defense by 150"
      },
      {
        "user_object_id": 26,
        "user_id": 7,
        "object_id": 4,
        "quantity": 25037,
        "objects": {
          "name": "huevo_duro",
          "description": "Increases user attack by 100"
        },
        "name": "huevo_duro",
        "description": "Increases user attack by 100"
      }
    ]
  }
]
const fighters = [
  {
    "fighter_id": 1,
    "level": 1,
    "min_xp": 100,
    "attack": 52,
    "special_attack": 30,
    "defense": 30,
    "special_defense": 79,
    "max_hp": 361,
    "accuracy": 65,
    "fighter_level_id": 1,
    "img_back": "./assets/img/charizard-back.png",
    "img_front": "./assets/img/charizard-front.gif",
    "name": "Charizard",
    "price": 110
  },
  {
    "fighter_id": 2,
    "level": 1,
    "min_xp": 100,
    "attack": 48,
    "special_attack": 17,
    "defense": 115,
    "special_defense": 56,
    "max_hp": 266,
    "accuracy": 65,
    "fighter_level_id": 101,
    "img_back": "./assets/img/batman-back.png",
    "img_front": "./assets/img/batman-front.png",
    "name": "Batman",
    "price": 100
  },
  {
    "fighter_id": 3,
    "level": 1,
    "min_xp": 100,
    "attack": 95,
    "special_attack": 85,
    "defense": 77,
    "special_defense": 44,
    "max_hp": 244,
    "accuracy": 65,
    "fighter_level_id": 201,
    "img_back": "./assets/img/goku.png",
    "img_front": "/assets/img/goku-front.png",
    "name": "Goku",
    "price": 100
  },
  {
    "fighter_id": 4,
    "level": 1,
    "min_xp": 100,
    "attack": 108,
    "special_attack": 69,
    "defense": 52,
    "special_defense": 31,
    "max_hp": 451,
    "accuracy": 65,
    "fighter_level_id": 301,
    "img_back": "./assets/img/vegeta-back.gif",
    "img_front": "./assets/img/vegeta-front.gif",
    "name": "Vegeta",
    "price": 100
  },
  {
    "fighter_id": 5,
    "level": 1,
    "min_xp": 100,
    "attack": 54,
    "special_attack": 79,
    "defense": 38,
    "special_defense": 51,
    "max_hp": 293,
    "accuracy": 65,
    "fighter_level_id": 401,
    "img_back": "./assets/img/mew-back.png",
    "img_front": "./assets/img/mew-front.png",
    "name": "Mew",
    "price": 100
  },
  {
    "fighter_id": 6,
    "level": 1,
    "min_xp": 100,
    "attack": 37,
    "special_attack": 26,
    "defense": 40,
    "special_defense": 98,
    "max_hp": 289,
    "accuracy": 65,
    "fighter_level_id": 501,
    "img_back": "./assets/img/michael3.gif",
    "img_front": "./assets/img/michael-front.gif",
    "name": "Michael",
    "price": 100
  },
  {
    "fighter_id": 7,
    "level": 1,
    "min_xp": 100,
    "attack": 18,
    "special_attack": 53,
    "defense": 33,
    "special_defense": 97,
    "max_hp": 219,
    "accuracy": 65,
    "fighter_level_id": 601,
    "img_back": "./assets/img/Ikki-back.gif",
    "img_front": "./assets/img/Ikki-front.gif",
    "name": "Ikki",
    "price": 100
  },
  {
    "fighter_id": 8,
    "level": 1,
    "min_xp": 100,
    "attack": 52,
    "special_attack": 30,
    "defense": 30,
    "special_defense": 79,
    "max_hp": 361,
    "accuracy": 65,
    "fighter_level_id": 701,
    "img_back": "./assets/img/venom-back.gif",
    "img_front": "./assets/img/venom-front.gif",
    "name": "Venom",
    "price": 999999
  },
  {
    "fighter_id": 9,
    "level": 1,
    "min_xp": 100,
    "attack": 52,
    "special_attack": 30,
    "defense": 30,
    "special_defense": 79,
    "max_hp": 361,
    "accuracy": 65,
    "fighter_level_id": 801,
    "img_back": "./assets/img/joker-back.gif",
    "img_front": "./assets/img/joker-front.gif",
    "name": "Joker",
    "price": 999999
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
  global.fetch = jest.fn();
  test('renders ShopPage component', async () => {
    fetch
      .mockResolvedValueOnce({ json: () => ( user ), ok: true })
      .mockResolvedValueOnce({ json: () => (objects), ok: true })
      .mockResolvedValueOnce({ json: () => (fighters), ok: true })
      
    await act(async () => {
      render(
        <MyContextProvider value={mockContextValue}>
          <MemoryRouter initialEntries={['/shop']}>
            <I18nextProvider i18n={i18n}>
              <ShopPage />
            </I18nextProvider>
          </MemoryRouter>
        </MyContextProvider>
      );
    });

    // Puedes ajustar los selectores según la estructura de tu componente
    const backButton = screen.getByText(i18n.t('shoppage.main')); // Ajusta el texto según tu aplicación

    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    // Asegúrate de que la función navigate se haya llamado con "/"
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
  test('buys fighter', async () => {
    fetch
      .mockResolvedValueOnce({ json: () => ( user ), ok: true })
      .mockResolvedValueOnce({ json: () => (objects), ok: true })
      .mockResolvedValueOnce({ json: () => (fighters), ok: true })
     
    await act(async () => {
      render(
        <MyContextProvider value={mockContextValue}>
          <MemoryRouter initialEntries={['/shop']}>
            <I18nextProvider i18n={i18n}>
              <ShopPage />
            </I18nextProvider>
          </MemoryRouter>
        </MyContextProvider>
      );
    });
    // Puedes ajustar los selectores según la estructura de tu componente
    fetch.mockResolvedValueOnce({
      ok: true,
    })
    const buyButton = screen.getAllByText(i18n.t('shoppage.buy')); // Ajusta el texto según tu aplicación
    await act (async() => {fireEvent.click(buyButton[8])})
  });
  test('buys object', async () => {
    fetch
      .mockResolvedValueOnce({ json: () => ( user ), ok: true })
      .mockResolvedValueOnce({ json: () => (objects), ok: true })
      .mockResolvedValueOnce({ json: () => (fighters), ok: true })
     
    await act(async () => {
      render(
        <MyContextProvider value={mockContextValue}>
          <MemoryRouter initialEntries={['/shop']}>
            <I18nextProvider i18n={i18n}>
              <ShopPage />
            </I18nextProvider>
          </MemoryRouter>
        </MyContextProvider>
      );
    });
    // Puedes ajustar los selectores según la estructura de tu componente
    const buyButton = screen.getAllByText(i18n.t('shoppage.buy')); // Ajusta el texto según tu aplicación
    fireEvent.click(buyButton[3])
    const increaseQuantity=screen.getByText("+")
    const decreaseQuantity=screen.getByText("-")
    const buyObject=screen.getByText('Buy object')
    fireEvent.click(decreaseQuantity)
    fireEvent.click(increaseQuantity)
    fireEvent.click(decreaseQuantity)
    fetch.mockResolvedValueOnce({
      ok: true,
    })
    await act(async () => {fireEvent.click(buyObject)})
  });


})
