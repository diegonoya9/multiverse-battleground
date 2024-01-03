// ObjectCard.test.js
import React from 'react';
import { render } from '@testing-library/react';
import ObjectCard from './ObjectCard';
const object={
    "user_object_id": 2,
    "user_id": 1,
    "object_id": 7,
    "quantity": 25911,
    "objects": {
        "object_id": 7,
        "category": "userItem",
        "description": "Money",
        "img": "./assets/img/money.png",
        "name": "Money",
        "price": 1,
        "quantity": 1,
        "type": "consumable",
        "actionobjects": []
    },
    "name": "Money",
    "description": "Money",
    "img": "./assets/img/money.png"
}

test('renders ObjectCard component', () => {
  // Renderiza ObjectCard dentro de MyContextProvider con el contexto simulado
  const { getByText } = render(
      <ObjectCard object={object}/>
  );

  // Puedes agregar expectativas para asegurarte de que los elementos esperados estén presentes
  expect(getByText(/25911/)).toBeInTheDocument();
});
