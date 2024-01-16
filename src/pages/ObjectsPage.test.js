// ObjectsPage.test.js
import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { MyContextProvider } from '../context/MyContext';
import ObjectsPage from './ObjectsPage';
import renderer from 'react-test-renderer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
afterEach(() => {
  global.fetch.mockRestore();
  cleanup();
});
// Mock del contexto para la prueba
const mockUserContext = {
  idUsuario: 1,
  backEndUrl: "http://localhost:3009/api"
  // Otros datos relacionados con el usuario si es necesario
};
const testRouter = createBrowserRouter([
  {
    path: '/',
    element: <div />,
  },
]);
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
let component
const user = { user_id: 1 }
test('renders objects page component', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(objects)
  });
  // Renderiza ObjectsPage dentro de MyContextProvider con el contexto simulado
  await act(async () => {
    component = render(
      <MyContextProvider value={{ userContext: mockUserContext }}>
        <RouterProvider router={testRouter}>
          <ObjectsPage user={user} />
        </RouterProvider>
      </MyContextProvider>
    );
  })

  // Puedes agregar expectativas para asegurarte de que los elementos esperados est�n presentes
  component.getByText("Back to Main Menu")
});
it('renders objectpage correctly according to snapshot', () => {
  const tree = renderer
    .create(
      <MyContextProvider value={{ userContext: mockUserContext }}>
        <ObjectsPage user={user} />
      </MyContextProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
