// ObjectsPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyContextProvider } from '../context/MyContext';
import ObjectsPage from './ObjectsPage';
import renderer from 'react-test-renderer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayuout from './Root';
import Home from '../components/Multiverse/Home';
import Multiverse from '../components/Multiverse/Multiverse';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
jest.mock('react-audio-player', () => {
  const ReactAudioPlayer = jest.fn();
  ReactAudioPlayer.prototype.play = jest.fn();
  return ReactAudioPlayer;
});
/*const objects = [
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
]*/
const mockNavigate = jest.fn();
beforeAll(() => {
  i18n.use(initReactI18next)
});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ObjectsPage Component', () => {
  // Mock del contexto
  const mockContext = {
    userContext: {
      backEndUrl: 'http://example.com',
      bg: 0,
      user: {
        user_id: 7
      }
    },
    setUserId: jest.fn(),
  };

  it('handles click on "Back to Main Menu" button', async () => {
    render(
      <MyContextProvider value={mockContext}>
        <ObjectsPage />
      </MyContextProvider>
    );

    // Simula el clic en el botón
    fireEvent.click(screen.getByText('Back to Main Menu'));

    // Asegúrate de que la función navigate se haya llamado con "/"
    expect(mockNavigate).toHaveBeenCalledWith('/');
    // Puedes realizar más assertions según tus necesidades
  });
  it('renders objectpage correctly according to snapshot', () => {
    const tree = renderer
      .create(
        <MyContextProvider value={mockContext}>
          <RouterProvider router={testRouter}>
            <ObjectsPage />
          </RouterProvider>
        </MyContextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  // Puedes escribir más pruebas para otras interacciones y comportamientos del componente
});

/*
afterEach(() => {
  global.fetch.mockRestore();
  cleanup();
});*/
const testRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootLayuout />,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        children: [
          { index: true, element: <Multiverse /> },
          { path: '/bag', element: <ObjectsPage /> },
        ]
      }
    ]
  }
])

/*
let component
const user = { user_id: 1 }
test('renders objects page component', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(objects)
  });
  // Renderiza ObjectsPage dentro de MyContextProvider con el contexto simulado
  await act(async () => {
    component = render(
      <RouterProvider router={testRouter}>
        <MyContextProvider value={{ userContext: mockUserContext }}>
          <ObjectsPage />
        </MyContextProvider>
      </RouterProvider>
    );
  })

  // Puedes agregar expectativas para asegurarte de que los elementos esperados est�n presentes
  component.getByText("Back to Main Menu")
});
it('renders objectpage correctly according to snapshot', () => {
  const tree = renderer
    .create(
      <MyContextProvider value={{ userContext: mockUserContext }}>
        <RouterProvider router={testRouter}>
          <ObjectsPage />
        </RouterProvider>
      </MyContextProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
*/