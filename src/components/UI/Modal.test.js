// Modal.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal';

test('renders Modal component', () => {
  // Renderiza Modal dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
    <div id="root">
      <Modal >
        children
      </Modal>
    </div>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados est�n presentes
  expect(getByText(/children/)).toBeInTheDocument();
});
