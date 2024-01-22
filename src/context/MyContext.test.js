import React ,{useContext} from 'react';
import { render, fireEvent, act,screen } from '@testing-library/react';
import { MyContextProvider,MyContext } from './MyContext';

// Componente de prueba que consume el contexto
const ConsumerComponent = () => {
  const { userContext, setUserName,setUserLoggedIn ,setCurrentMission,setBg,setSound,setSfx} = useContext(MyContext);

  return (
    <div>
      <p>User Name: {userContext.userName}</p>
      <p>Logged In: {userContext.logged_in && 'Logueado' }</p>
      <p>Current Mission: {userContext.currentMission }</p>
      <p>Bg: {userContext.bg }</p>
      <p>Sound: {userContext.sound }</p>
      <p>Sfx: {userContext.sfx }</p>
      <button onClick={() => setUserLoggedIn(true)}>Set Logged In</button>
      <button onClick={() => setUserName('Alice')}>Set UserName</button>
      <button onClick={() => setCurrentMission(2)}>Set Current Mission</button>
      <button onClick={() => setBg(15)}>Set Bg</button>
      <button onClick={() => setSound(15)}>Set Sound</button>
      <button onClick={() => setSfx(15)}>Set Sfx</button>
    </div>
  );
};

test('MyContextProvider provides correct context values and functions', () => {
  act(() => {
    render(
      <MyContextProvider>
        <ConsumerComponent />
      </MyContextProvider>
    )
  })

  // Verificar que el contexto se proporciona correctamente
  expect(screen.getByText(/User Name:/)).toBeInTheDocument()

  // Verificar que las funciones del contexto se ejecutan correctamente
  act(() => {
    fireEvent.click(screen.getByText('Set Logged In'))
  });
  expect(screen.getByText(/Logged In: Logueado/)).toBeInTheDocument()
  act(() => {
    fireEvent.click(screen.getByText('Set UserName'))
  });
  expect(screen.getByText(/User Name: Alice/)).toBeInTheDocument()
  act(() => {
    fireEvent.click(screen.getByText('Set Current Mission'))
  });
  expect(screen.getByText(/Current Mission: 2/)).toBeInTheDocument()
  act(() => {
    fireEvent.click(screen.getByText('Set Bg'))
  });
  expect(screen.getByText(/Bg: 15/)).toBeInTheDocument()
  act(() => {
    fireEvent.click(screen.getByText('Set Sound'))
  });
  expect(screen.getByText(/Sound: 15/)).toBeInTheDocument()
  act(() => {
    fireEvent.click(screen.getByText('Set Sfx'))
  });
  expect(screen.getByText(/Sfx: 15/)).toBeInTheDocument()
});
