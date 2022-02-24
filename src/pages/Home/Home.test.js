import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAppSelector } from '../../redux/hooks'

import { Home } from './Home'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => {
  return {
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
  }
})

const mockAppState = {
  stock: {
    list: [],
    loading: false,
  },
}
beforeEach(() => {
  useAppSelector.mockImplementation((callback) => callback(mockAppState))
})

afterEach(() => {
  useAppSelector.mockClear()
})

it('renders Home page', async () => {
  render(<Home />)

  expect(screen.getByText('Welcome to Trading App')).toBeInTheDocument()
})
