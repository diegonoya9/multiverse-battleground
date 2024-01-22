// Modal.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Loading from './Loading';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
beforeAll(() => {
    i18n.use(initReactI18next)
});
test('renders Modal component', () => {
    // Renderiza Modal dentro de MyContextProvider con el contexto simulado
    const { getByText } = render(
        <I18nextProvider i18n={i18n}>
            <Loading >
            </Loading>
        </I18nextProvider >
    );

    // Puedes agregar expectativas para asegurarte de que los elementos esperados est�n presentes
    expect(getByText(i18n.t("loading.loading"))).toBeInTheDocument();
});
