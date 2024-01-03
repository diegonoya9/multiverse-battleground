// Action.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Action from './Action';

const action={
    value:250,
    field:"current_hp"
}
test('renders Action component', () => {
  // Renderiza Action dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
      <Action action={action}/>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados estén presentes
  expect(getByText(/250/)).toBeInTheDocument();
});
