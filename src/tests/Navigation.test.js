import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from '@testing-library/react'
import { Router } from 'react-router-dom'
import axiosMock from 'axios'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'

import App from '../App'
import Navigation from '../components/Navigation'
import store from '../store'
jest.mock('axios')

beforeEach(() => {
  cleanup()
  dummyMock()
})

function dummyMock() {
  return axiosMock.get.mockResolvedValueOnce({
    data: {
      results: [
        {
          popularity: 1099.847,
          vote_count: 611,
          video: false,
          poster_path: '/uPGq1mkEXznUpapDmOSxbsybjfp.jpg',
          id: 475303,
          adult: false,
          backdrop_path: '/6fkqwqLEcDZOEAnBBfKAniwNxtx.jpg',
          original_language: 'en',
          original_title: 'Batman',
          genre_ids: [35, 10749],
          title: 'Batman',
          vote_average: 6.7,
          overview:
            "Two young people arrive in New York to spend a weekend, but once they arrive they're met with bad weather and a series of adventures.",
          release_date: '2019-07-26'
        }
      ]
    }
  })
}

test('testing navbar and navigation on app', () => {
  const history = createMemoryHistory()
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Navigation />
      </Router>
    </Provider>
  )

  fireEvent.click(getByTestId('popular'))
  expect(history.location.pathname).toBe('/movies/popular')
  fireEvent.click(getByTestId('top_rated'))
  expect(history.location.pathname).toBe('/movies/top_rated')
  fireEvent.click(getByTestId('now_playing'))
  expect(history.location.pathname).toBe('/movies/now_playing')
  fireEvent.click(getByTestId('upcoming'))
  expect(history.location.pathname).toBe('/movies/upcoming')
  fireEvent.click(getByTestId('favorites'))
  expect(history.location.pathname).toBe('/movies/favorites')
})

test('search bar', () => {
  const history = createMemoryHistory()
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Navigation />
      </Router>
    </Provider>
  )
  fireEvent.change(getByTestId('searchInput'), { target: { value: 'batman' } })
  fireEvent.click(getByTestId('search'))
  expect(history.location.pathname).toBe('/search')
  expect(history.location.search).toBe('?title=batman')
})

test('submit search bar', () => {
  const history = createMemoryHistory()
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Navigation />
      </Router>
    </Provider>
  )
  fireEvent.change(getByTestId('searchInput'), { target: { value: 'batman' } })
  fireEvent.submit(getByTestId('searchInput'))
  expect(history.location.pathname).toBe('/search')
  expect(history.location.search).toBe('?title=batman')
})

test('test each page should have correct name', async () => {
  dummyMock()
  const { getByTestId, getByText } = render(<App />)

  fireEvent.click(getByTestId('popular'))
  expect(getByTestId('pageTitle')).toHaveTextContent('Popular Movies')
  fireEvent.click(getByTestId('upcoming'))
  expect(getByTestId('pageTitle')).toHaveTextContent('Upcoming Movies')
  fireEvent.click(getByTestId('top_rated'))
  expect(getByTestId('pageTitle')).toHaveTextContent('Top Rated Movies')
  fireEvent.click(getByTestId('now_playing'))
  expect(getByTestId('pageTitle')).toHaveTextContent('Now Playing Movies')
  fireEvent.click(getByTestId('favorites'))
  expect(getByTestId('pageTitle')).toHaveTextContent('Favorite Movies')
  fireEvent.change(getByTestId('searchInput'), { target: { value: 'batman' } })
  fireEvent.click(getByTestId('search'))
  const movie = await waitForElement(() => getByText(/batman/i))
  expect(getByTestId('pageTitle')).toHaveTextContent('Search Results')
  expect(movie).toBeInTheDocument()
})
