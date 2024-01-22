import '@testing-library/jest-dom'
import { render, act, screen } from '@testing-library/react'
import { MyContextProvider } from '../../context/MyContext';
import { MemoryRouter } from 'react-router-dom';
import { Home, handleGoogleLogin } from './Home'
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';


jest.mock('react-audio-player', () => {
    const ReactAudioPlayer = jest.fn();
    ReactAudioPlayer.prototype.play = jest.fn();
    return ReactAudioPlayer;
});

beforeAll(() => {
    i18n.use(initReactI18next)
});

describe('Home Component', () => {
    // Mock del contexto para la prueba

    const mockContextValue = {
        userContext: {
            user: { user_id: 1 },
            backEndUrl: 'http://example.com/api',
            idUsuario: 1,
            bg: 50,
        },
    };
    global.fetch = jest.fn();
    test('renders Home component', async () => {


        await act(async () => {
            render(
                <MyContextProvider value={mockContextValue}>
                    <MemoryRouter initialEntries={['/']}>
                        <I18nextProvider i18n={i18n}>
                            <Home />
                        </I18nextProvider>
                    </MemoryRouter>
                </MyContextProvider>
            );
        });

        // Puedes ajustar los selectores según la estructura de tu componente
        const loginText = screen.getByText(i18n.t('home.login')); // Ajusta el texto según tu aplicación

        expect(loginText).toBeInTheDocument();

    });
    /* test('buys fighter', async () => {
       fetch
         .mockResolvedValueOnce({ json: () => ( user ), ok: true })
         .mockResolvedValueOnce({ json: () => (objects), ok: true })
         .mockResolvedValueOnce({ json: () => (fighters), ok: true })
        
       await act(async () => {
         render(
           <MyContextProvider value={mockContextValue}>
             <MemoryRouter initialEntries={['/shop']}>
               <I18nextProvider i18n={i18n}>
                 <ShopPage />
               </I18nextProvider>
             </MemoryRouter>
           </MyContextProvider>
         );
       });
       // Puedes ajustar los selectores según la estructura de tu componente
       fetch.mockResolvedValueOnce({
         ok: true,
       })
       const buyButton = screen.getAllByText(i18n.t('shoppage.buy')); // Ajusta el texto según tu aplicación
       await act (async() => {fireEvent.click(buyButton[8])})
     });
     test('buys object', async () => {
       fetch
         .mockResolvedValueOnce({ json: () => ( user ), ok: true })
         .mockResolvedValueOnce({ json: () => (objects), ok: true })
         .mockResolvedValueOnce({ json: () => (fighters), ok: true })
        
       await act(async () => {
         render(
           <MyContextProvider value={mockContextValue}>
             <MemoryRouter initialEntries={['/shop']}>
               <I18nextProvider i18n={i18n}>
                 <ShopPage />
               </I18nextProvider>
             </MemoryRouter>
           </MyContextProvider>
         );
       });
       // Puedes ajustar los selectores según la estructura de tu componente
       const buyButton = screen.getAllByText(i18n.t('shoppage.buy')); // Ajusta el texto según tu aplicación
       fireEvent.click(buyButton[3])
       const increaseQuantity=screen.getByText("+")
       const decreaseQuantity=screen.getByText("-")
       const buyObject=screen.getByText('Buy object')
       fireEvent.click(decreaseQuantity)
       fireEvent.click(increaseQuantity)
       fireEvent.click(decreaseQuantity)
       fetch.mockResolvedValueOnce({
         ok: true,
       })
       await act(async () => {fireEvent.click(buyObject)})
     });*/


})