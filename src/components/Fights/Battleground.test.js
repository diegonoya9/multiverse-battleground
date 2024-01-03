import React from 'react';
import { render } from '@testing-library/react';
import { MyContextProvider } from '../../context/MyContext';
import Battleground from './Battleground';

// Mock del contexto para la prueba
const mockUserContext = {
  idUsuario: 1,
  // Otros datos relacionados con el usuario si es necesario
};
Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    writable: true,
    value: function () {
      /* implementación vacía o con lógica simulada según sea necesario */
    },
  });
test('renders Battleground component', () => {
  // Renderiza Battleground dentro de MyContextProvider con el contexto simulado
  const component = render(<MyContextProvider value={{ userContext: mockUserContext }}>
    <Battleground />
  </MyContextProvider>)
    component.findByAltText('battlegroundBackground')

});