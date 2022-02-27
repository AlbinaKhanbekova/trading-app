import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as reactRedux from 'react-redux'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { useAppSelector } from '../../redux/hooks'

import { Favorites } from './Favorites'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('Favorites page', () => {
  const mockStore = {
    favorites: {
      list: [],
    },
    stock: {
      stockDetails: {},
    },
  }

  const useSelectorMock = reactRedux.useSelector
  const useDispatchMock = reactRedux.useDispatch

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {})
    useSelectorMock.mockImplementation((selector) => selector(mockStore))
  })
  afterEach(() => {
    useDispatchMock.mockClear()
    useSelectorMock.mockClear()
  })

  it('renders empty page', async () => {
    const { container } = render(<Favorites />, { wrapper: MemoryRouter })
    expect(container).toHaveTextContent(
      `You don't have favorites yet. You can add them from Home page`
    )
  })

  it('renders page with one item', async () => {
    useAppSelector.mockImplementation((callback) =>
      callback({
        favorites: {
          list: [
            {
              symbol: 'TEST',
              companyName: 'Test name',
            },
          ],
        },
        stock: {
          stockDetails: {},
        },
      })
    )
    render(<Favorites />)

    expect(screen.getByText('TEST')).toBeInTheDocument()
    expect(screen.getByText('Test name')).toBeInTheDocument()
  })

  it('star icon should call removeFromFavorites action', async () => {
    useAppSelector.mockImplementation((callback) =>
      callback({
        favorites: {
          list: [
            {
              symbol: 'TEST',
              companyName: 'Test name',
            },
          ],
        },
        stock: {
          stockDetails: {},
        },
      })
    )
    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
    render(<Favorites />)

    const buttonEl = screen.getByText('star.svg')
    userEvent.click(buttonEl)

    expect(dummyDispatch).toHaveBeenCalledWith({
      payload: { companyName: 'Test name', symbol: 'TEST' },
      type: 'favorites/removeFromFavorites',
    })
  })

  it('row click should display stock details', async () => {
    useAppSelector.mockImplementation((callback) =>
      callback({
        favorites: {
          list: [
            {
              symbol: 'TEST',
              companyName: 'Test name',
            },
          ],
        },
        stock: {
          stockDetails: {
            close: 155,
          },
        },
      })
    )
    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
    render(<Favorites />)

    const buttonEl = screen.getByText('TEST')
    userEvent.click(buttonEl)

    expect(screen.getByText('$155')).toBeInTheDocument()
  })
})
