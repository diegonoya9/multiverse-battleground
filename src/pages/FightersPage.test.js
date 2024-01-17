import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MyContextProvider } from '../context/MyContext'; // Asegúrate de tener el provider de contexto adecuado
import FightersPage from './FightersPage';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
beforeAll(() => {
    i18n.use(initReactI18next)
});
describe('FightersPage Component', () => {
    test('renders FightersPage component', async () => {
        // Mock del contexto necesario
        const mockContextValue = {
            userContext: {
                user: { user_id: 1 },
                backEndUrl: 'http://example.com/api',
                idUsuario: 1,
                bg: 50,
            },
        };

        render(
            <MyContextProvider value={mockContextValue}>
                <MemoryRouter initialEntries={['/fighters']}>
                    <I18nextProvider i18n={i18n}>
                        <FightersPage />
                    </I18nextProvider>
                </MemoryRouter>
            </MyContextProvider>
        );

        // Puedes ajustar los selectores según la estructura de tu componente
        const backButton = screen.getByText(i18n.t('fighterspage.back')); // Ajusta el texto según tu aplicación

        expect(backButton).toBeInTheDocument();

        // Aquí puedes realizar más aserciones según tus necesidades
    });

    // Puedes agregar más pruebas según las funcionalidades de tu componente
    // Por ejemplo, pruebas para las funciones addToParty, removeFromParty, etc.
});
