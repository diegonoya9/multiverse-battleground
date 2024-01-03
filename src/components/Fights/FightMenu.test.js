// FightMenu.test.js
import { render } from '@testing-library/react';
import FightMenu from './FightMenu';

test('renders FightMenu component', () => {
  // Renderiza FightMenu dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
      <FightMenu />
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados estén presentes
  expect(getByText(/Fighters/)).toBeInTheDocument();
});
