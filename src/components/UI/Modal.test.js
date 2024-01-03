// Modal.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal';

test('renders Modal component', () => {
  // Renderiza Modal dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
      <Modal >
        children
      </Modal>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados estén presentes
  expect(getByText(/children/)).toBeInTheDocument();
});
