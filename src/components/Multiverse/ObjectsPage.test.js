// ObjectsPage.test.js
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MyContextProvider } from '../../context/MyContext';
import ObjectsPage from './ObjectsPage';
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
const user = { user_id: 1 }
test('renders objects page component', () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(objects)
  });
  // Renderiza ObjectsPage dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
    <MyContextProvider value={{ userContext: mockUserContext }}>
      <ObjectsPage user={user} />
    </MyContextProvider>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados est�n presentes
  expect(getByText(/Back to Main Menu/)).toBeInTheDocument();
});
