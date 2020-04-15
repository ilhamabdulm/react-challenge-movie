import React from 'react'
import {
  render,
  fireEvent,
  waitForElement,
  cleanup
} from '@testing-library/react'
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import axiosMock from 'axios'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { customMiddleware } from '../store/middleware'
import reducer from '../store/reducers'
import App from '../App'
import MovieList from '../components/MovieList'

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
          original_title: 'A Rainy Day in New York',
          genre_ids: [35, 10749],
          title: 'A Rainy Day in New York',
          vote_average: 6.7,
          overview:
            "Two young people arrive in New York to spend a weekend, but once they arrive they're met with bad weather and a series of adventures.",
          release_date: '2019-07-26'
        }
      ]
    }
  })
}

test('movie list should return list of movies', async () => {
  dummyMock()
  const history = createMemoryHistory({
    initialEntries: ['/movies/popular']
  })
  const store = createStore(reducer, applyMiddleware(thunk, customMiddleware))
  const { getByText, getByTestId, debug } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/movies/:category" component={MovieList} />
      </Router>
    </Provider>
  )
  const title = await waitForElement(() =>
    getByText(/A Rainy Day in New York/i)
  )
  const movie = await waitForElement(() => getByTestId('475303'))
  expect(title).toBeInTheDocument()
  expect(movie).toBeInTheDocument()
})

test('change page now playing', async () => {
  dummyMock()
  const history = createMemoryHistory({
    initialEntries: ['/movies/now_playing']
  })
  const store = createStore(reducer, applyMiddleware(thunk, customMiddleware))
  const { getByText, getByTestId, debug } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/movies/:category" component={MovieList} />
      </Router>
    </Provider>
  )
  const title = await waitForElement(() =>
    getByText(/A Rainy Day in New York/i)
  )
  const movie = await waitForElement(() => getByTestId('475303'))
  expect(getByTestId('pageTitle')).toHaveTextContent('Now Playing')
  expect(title).toBeInTheDocument()
  expect(movie).toBeInTheDocument()
})

test('change page to upcoming', async () => {
  dummyMock()
  const history = createMemoryHistory({
    initialEntries: ['/movies/upcoming']
  })
  const store = createStore(reducer, applyMiddleware(thunk, customMiddleware))
  const { getByText, getByTestId, debug } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/movies/:category" component={MovieList} />
      </Router>
    </Provider>
  )
  const title = await waitForElement(() =>
    getByText(/A Rainy Day in New York/i)
  )
  const movie = await waitForElement(() => getByTestId('475303'))
  expect(getByTestId('pageTitle')).toHaveTextContent('Upcoming')
  expect(title).toBeInTheDocument()
  expect(movie).toBeInTheDocument()
})

test('change page to top rated', async () => {
  dummyMock()
  const history = createMemoryHistory({
    initialEntries: ['/movies/top_rated']
  })
  const store = createStore(reducer, applyMiddleware(thunk, customMiddleware))
  const { getByText, getByTestId, debug } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/movies/:category" component={MovieList} />
      </Router>
    </Provider>
  )
  const title = await waitForElement(() =>
    getByText(/A Rainy Day in New York/i)
  )
  const movie = await waitForElement(() => getByTestId('475303'))
  expect(getByTestId('pageTitle')).toHaveTextContent('Top Rated Movies')
  expect(title).toBeInTheDocument()
  expect(movie).toBeInTheDocument()
})

test('page title must have category title, search bar, and pagination', async () => {
  const { getByText, getByTestId } = render(<App />)
  const title = getByText(/movies/i)
  const searchBar = getByTestId('searchBar')
  const paginationBack = getByTestId('paginationBack')
  const paginationNext = getByTestId('paginationNext')
  const pagination1 = getByTestId('pagination1')
  expect(title).toBeInTheDocument()
  expect(searchBar).toBeInTheDocument()
  expect(paginationBack).toBeInTheDocument()
  expect(paginationNext).toBeInTheDocument()
  fireEvent.click(paginationNext)
  fireEvent.click(paginationBack)
  fireEvent.click(pagination1)
  fireEvent.change(searchBar, { target: { event: 'A Rainy' } })
})
