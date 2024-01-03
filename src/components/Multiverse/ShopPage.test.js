// ShopPage.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { MyContextProvider } from '../../context/MyContext';
import ShopPage from './ShopPage';

// Mock del contexto para la prueba
const mockUserContext = {
  idUsuario: 1,
  // Otros datos relacionados con el usuario si es necesario
};

test('renders shop page component', () => {
  // Renderiza ShopPage dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
    <MyContextProvider value={{ userContext: mockUserContext }}>
      <ShopPage />
    </MyContextProvider>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados estén presentes
  expect(getByText(/Back to Main Menu/)).toBeInTheDocument();
});
