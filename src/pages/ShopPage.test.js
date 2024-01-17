// ShopPage.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { MyContextProvider } from '../context/MyContext';
import ShopPage from './ShopPage'; import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { MemoryRouter } from 'react-router-dom';
beforeAll(() => {
  i18n.use(initReactI18next)
});

// Mock del contexto para la prueba
const mockContextValue = {
  userContext: {
    user: { user_id: 1 },
    backEndUrl: 'http://example.com/api',
    idUsuario: 1,
    bg: 50,
  },
};

let component
test('renders shop page component', () => {
  // Renderiza ShopPage dentro de MyContextProvider con el contexto simulado
  component = render(<>
    <MemoryRouter initialEntries={['/shop']}>
      <I18nextProvider i18n={i18n}>
        <MyContextProvider value={mockContextValue}>
          <ShopPage />
        </MyContextProvider>
      </I18nextProvider>
    </MemoryRouter>
  </>
  );
  // Puedes agregar expectativas para asegurarte de que los elementos esperados est�n presentes
  component.getByText("Back to Main Menu")
});
