import React from 'react';
import { render } from '@testing-library/react';
import { MyContextProvider } from '../../context/MyContext';
import Multiverse from './Multiverse';

// Mock del contexto para la prueba
const mockUserContext = {
  idUsuario: 1,
  // Otros datos relacionados con el usuario si es necesario
};

test('renders multiverse component', () => {
  // Renderiza Multiverse dentro de MyContextProvider con el contexto simulado
  const component = render(<MyContextProvider value={{ userContext: mockUserContext }}>
    <Multiverse />
  </MyContextProvider>)
    component.findByAltText('mainDiv')

});