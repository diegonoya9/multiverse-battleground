// App.test.js

import { render } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  // Renderiza App dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
      <App/>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados est�n presentes
  expect(getByText(/Welcome to the Multiverse Battleground/)).toBeInTheDocument();
});
