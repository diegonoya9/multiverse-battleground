// Button.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

test('renders Button component', () => {
  // Renderiza Button dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
      <Button value="valorDePrueba"/>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados est�n presentes
  expect(getByText(/valorDePrueba/)).toBeInTheDocument();
});
