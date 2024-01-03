// ObjectsPage.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { MyContextProvider } from '../../context/MyContext';
import ObjectsPage from './ObjectsPage';

// Mock del contexto para la prueba
const mockUserContext = {
  idUsuario: 1,
  // Otros datos relacionados con el usuario si es necesario
};
const user ={user_id:1}
test('renders objects page component', () => {
  // Renderiza ObjectsPage dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
    <MyContextProvider value={{ userContext: mockUserContext }}>
      <ObjectsPage user={user}/>
    </MyContextProvider>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados estén presentes
  expect(getByText(/Back to Main Menu/)).toBeInTheDocument();
});
