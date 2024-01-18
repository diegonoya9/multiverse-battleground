// Button.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';
import { MyContextProvider } from '../../context/MyContext';
const mockContextValue = {
  userContext: {
    sound: 50,
  },
};
test('renders Button component', () => {
  // Renderiza Button dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
    <MyContextProvider value={mockContextValue}>
      <Button value="valorDePrueba" />
    </MyContextProvider>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados estén presentes
  expect(getByText(/valorDePrueba/)).toBeInTheDocument();
});
