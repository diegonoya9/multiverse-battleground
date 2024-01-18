import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyContextProvider } from '../context/MyContext'; // Asegúrate de importar tu contexto y proveedor adecuadamente
import UsersPage from './UsersPage';
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

describe('UsersPage Component', () => {
  // Mock del contexto
  const mockContext = {
    userContext: {
      backEndUrl: 'http://example.com',
    },
    setUserId: jest.fn(),
  };

  it('renders UsersPage component', async () => {
    render(
      <MyContextProvider value={mockContext}>
        <UsersPage />
      </MyContextProvider>
    );

    // Asegúrate de que el componente se renderice correctamente
    expect(screen.getByText('Back to Main Menu')).toBeInTheDocument();

    // Puedes realizar más assertions según tus necesidades
  });

  it('handles click on "Back to Main Menu" button', async () => {
    render(
      <MyContextProvider value={mockContext}>
        <UsersPage />
      </MyContextProvider>
    );

    // Simula el clic en el botón
    fireEvent.click(screen.getByText('Back to Main Menu'));

    // Asegúrate de que la función navigate se haya llamado con "/"
    expect(mockNavigate).toHaveBeenCalledWith('/');
    // Puedes realizar más assertions según tus necesidades
  });
  // Puedes escribir más pruebas para otras interacciones y comportamientos del componente
});
