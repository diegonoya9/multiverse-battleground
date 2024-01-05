import React from 'react';
import { render } from '@testing-library/react';
import { MyContextProvider } from '../../context/MyContext';
import Battleground from './Battleground';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

beforeAll(() => {
    i18n.use(initReactI18next)
});
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