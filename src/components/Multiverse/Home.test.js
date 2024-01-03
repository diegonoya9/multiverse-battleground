import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Home from './Home'

test('renders home component',() => {
    const component = render(<Home/>)
    component.getByText('Welcome to the Multiverse Battleground')
})