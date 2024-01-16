import React from 'react';
import { render } from '@testing-library/react';
import { MyContextProvider } from '../../context/MyContext';
import Battleground from './Battleground';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

beforeAll(() => {
  i18n.use(initReactI18next)
});
// Mock del contexto para la prueba
const mockUserContext = {
  idUsuario: 1,
  // Otros datos relacionados con el usuario si es necesario
};
const testRouter = createBrowserRouter([
  {
    path: '/',
    element: <div />,
  },
]);
Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  writable: true,
  value: function () {
    /* implementaci�n vac�a o con l�gica simulada seg�n sea necesario */
  },
});
test('renders Battleground component', () => {
  // Renderiza Battleground dentro de MyContextProvider con el contexto simulado
  const component = render(
    <MyContextProvider value={{ userContext: mockUserContext }}>
      <RouterProvider router={testRouter}>
        <Battleground />
      </RouterProvider>
    </MyContextProvider>)
  component.findByAltText('battlegroundBackground')

});