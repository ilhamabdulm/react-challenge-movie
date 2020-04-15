import React from 'react'
import {
  render,
  fireEvent,
  waitForElement,
  cleanup
} from '@testing-library/react'
import { Provider } from 'react-redux'
import axiosMock from 'axios'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { customMiddleware } from '../store/middleware'
import reducer from '../store/reducers'
import App from '../App'

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

const store = createStore(reducer, applyMiddleware(thunk, customMiddleware))

test('change page to detail page', async () => {
  dummyMock()
  const { getByText, getByTestId, debug } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  fireEvent.click(getByTestId('popular'))
  const title = await waitForElement(() =>
    getByText(/A Rainy Day in New York/i)
  )
  const movie = await waitForElement(() => getByTestId('475303'))
  expect(getByTestId('pageTitle')).toHaveTextContent('Popular Movies')
  expect(title).toBeInTheDocument()
  expect(movie).toBeInTheDocument()

  fireEvent.click(getByTestId('moreInfo'))
  const castMovie = await waitForElement(() => getByTestId('castMovie'))
  expect(castMovie).toBeInTheDocument()

  fireEvent.click(getByTestId('favBtn'))
  const success = await waitForElement(() =>
    getByText(/Movie Added to Favorite/i)
  )
  expect(success).toBeInTheDocument()
})

test('change page favorite', async () => {
  const { getByText, getByTestId, debug } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  fireEvent.click(getByTestId('favorites'))
  const title = await waitForElement(() =>
    getByText(/A Rainy Day in New York/i)
  )
  const movie = await waitForElement(() => getByTestId('475303'))
  expect(getByTestId('pageTitle')).toHaveTextContent('Favorite Movies')
  expect(title).toBeInTheDocument()
  expect(movie).toBeInTheDocument()
})
