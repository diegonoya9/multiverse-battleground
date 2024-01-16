// ShopPage.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { MyContextProvider } from '../context/MyContext';
import ShopPage from './ShopPage'; import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
beforeAll(() => {
  i18n.use(initReactI18next)
});
const testRouter = createBrowserRouter([
  {
    path: '/',
    element: <div />,
  },
]);
// Mock del contexto para la prueba
const mockUserContext = {
  idUsuario: 1,
  // Otros datos relacionados con el usuario si es necesario
};

let component
test('renders shop page component', () => {
  // Renderiza ShopPage dentro de MyContextProvider con el contexto simulado
  component = render(<>
    <RouterProvider>
      <I18nextProvider i18n={i18n}>
        <MyContextProvider value={{ userContext: mockUserContext }}>
          <ShopPage />
        </MyContextProvider>
      </I18nextProvider>
    </RouterProvider>
  </>
  );
  // Puedes agregar expectativas para asegurarte de que los elementos esperados est�n presentes
  component.getByText("Back to Main Menu")
});
