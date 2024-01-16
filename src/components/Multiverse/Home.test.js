import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MyContextProvider } from '../../context/MyContext';
import Home from './Home'
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

beforeAll(() => {
    i18n.use(initReactI18next)
});
const mockUserContext = {
    idUsuario: 1,
    // Otros datos relacionados con el usuario si es necesario
};
let component;
beforeEach(async () => {
    component = render(<>
        <MyContextProvider value={{ userContext: mockUserContext }}>
            <I18nextProvider i18n={i18n}>
                <Home />
            </I18nextProvider>
        </MyContextProvider>
    </>
    );
})
test('renders home component', () => {
    component.getByText(i18n.t('home.welcome'))
})