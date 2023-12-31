import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Home from './Home'
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

beforeAll(() => {
    i18n.use(initReactI18next)
});

let component;
beforeEach(async () => {
        component = render(<>
            <I18nextProvider i18n={i18n}>
            <Home />
        </I18nextProvider>
        </>
        );
})
test('renders home component', () => {
    component.getByText(i18n.t('home.welcome'))
})