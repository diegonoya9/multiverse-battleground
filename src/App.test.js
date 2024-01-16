// App.test.js

import { render } from '@testing-library/react';
import App from './App';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from './i18n';

beforeAll(() => {
  i18n.use(initReactI18next)
});

test('renders App component', () => {
  // Renderiza App dentro de MyContextProvider con el contexto simulado
  let component = render(<>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados est�n presentes
  component.getByText(i18n.t('home.login'))
});
