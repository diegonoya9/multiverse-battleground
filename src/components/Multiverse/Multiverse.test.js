import React,{startTransition } from 'react';
import { render } from '@testing-library/react';
import { MyContextProvider } from '../../context/MyContext';
import Multiverse from './Multiverse';
// Importa i18next y las funciones necesarias
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import renderer from 'react-test-renderer';

// Configura i18next
i18n.use(initReactI18next).init({
  lng: 'en', // Configura el idioma deseado
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
// Mock del contexto para la prueba
const mockUserContext = {
  idUsuario: 1,
  // Otros datos relacionados con el usuario si es necesario
};

test('renders multiverse component', () => {
  // Renderiza Multiverse dentro de MyContextProvider con el contexto simulado
  const component = render(<MyContextProvider value={{ userContext: mockUserContext }}>
    <Multiverse />
  </MyContextProvider>)
  component.findByAltText('mainDiv')

});

it('renders correctly accodring to snapshot', () => {
  const tree = renderer
    .create(
      <MyContextProvider value={{ userContext: mockUserContext }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          {/*
            Envuelve la parte que está causando la suspensión con startTransition
          */}
          {startTransition(() => (
            <Multiverse />
          ))}
        </React.Suspense>
      </MyContextProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});