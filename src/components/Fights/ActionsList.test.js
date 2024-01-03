// ActionsList.test.js
import { render } from '@testing-library/react';
import ActionsList from './ActionsList';

const actions=[{
    action_id:1,
    value:250,
    field:"current_hp",
    inflicted_on:"enemy"
}]
test('renders ActionsList component', () => {
  // Renderiza ActionsList dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
      <ActionsList inflictedActions={actions} turn="user"/>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados estén presentes
  expect(getByText(/250/)).toBeInTheDocument();
});
