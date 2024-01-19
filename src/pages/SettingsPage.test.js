import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MyContextProvider } from '../context/MyContext'; // Asegúrate de tener el provider de contexto adecuado
import SettingsPage from './SettingsPage';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
beforeAll(() => {
    i18n.use(initReactI18next)
});
jest.mock('react-audio-player', () => {
    const ReactAudioPlayer = jest.fn();
    ReactAudioPlayer.prototype.play = jest.fn();
    return ReactAudioPlayer;
});
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));
const mockContextValue = {
    userContext: {
        user: {
            user_id: 1, 
            bg: 50,
            sound: 50,
            sfx: 1
        },
        backEndUrl: 'http://example.com/api',
        idUsuario: 1,
        bg: 50,
        sound: 50,
        sfx: 1
    },
};
describe('SettingsPage Component', () => {

    it('renders correctly', async () => {
        await act(async () => {
            render(
                <MyContextProvider value={mockContextValue}>
                    <MemoryRouter initialEntries={['/config']}>
                        <I18nextProvider i18n={i18n}>
                            <SettingsPage />
                        </I18nextProvider>
                    </MemoryRouter>
                </MyContextProvider>
            );
        });
        expect(screen.getByText(i18n.t('settingspage.back'))).toBeInTheDocument();
        const saveButton = screen.getByText(i18n.t('settingspage.save'))
        const fakeResponse = { ok: true };
        global.fetch = jest.fn().mockResolvedValueOnce(fakeResponse);
        fireEvent.click(saveButton)
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        fireEvent.click(screen.getByText(i18n.t('settingspage.back')));

        // Asegúrate de que la función navigate se haya llamado con "/"
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
    it('decreases volume', async () => {
        await act(async () => {
            render(
                <MyContextProvider value={mockContextValue}>
                    <MemoryRouter initialEntries={['/config']}>
                        <I18nextProvider i18n={i18n}>
                            <SettingsPage />
                        </I18nextProvider>
                    </MemoryRouter>
                </MyContextProvider>
            );
        });
        const decreaseVolume = screen.getAllByText('-')
        fireEvent.click(decreaseVolume[0])
    });
    it('doesnt decrease volume when prev volume is 1', async () => {
        await act(async () => {
            render(
                <MyContextProvider value={mockContextValue}>
                    <MemoryRouter initialEntries={['/config']}>
                        <I18nextProvider i18n={i18n}>
                            <SettingsPage />
                        </I18nextProvider>
                    </MemoryRouter>
                </MyContextProvider>
            );
        });
        const decreaseVolume = screen.getAllByText('-')
        fireEvent.click(decreaseVolume[2])
    });
    it('increases volume', async () => {
        await act(async () => {
            render(
                <MyContextProvider value={mockContextValue}>
                    <MemoryRouter initialEntries={['/config']}>
                        <I18nextProvider i18n={i18n}>
                            <SettingsPage />
                        </I18nextProvider>
                    </MemoryRouter>
                </MyContextProvider>
            );
        });
        const increaseVolume = screen.getAllByText('+')
        fireEvent.click(increaseVolume[0])
    });
})