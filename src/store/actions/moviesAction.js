import { FETCH_MOVIES } from '../actionList'
import { apiKey } from '../../apiKey'
import axios from 'axios'
import { useState } from 'react'

export const fetchMovies = (page, category) => {
  return (dispatch, getState) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${category}`, {
        params: {
          api_key: apiKey,
          languange: 'en-US',
          page: page,
          region: 'id'
        }
      })
      .then(({ data }) => {
        const movies = data
        dispatch({
          type: FETCH_MOVIES,
          payload: {
            movieList: movies.results,
            totalPages: movies.total_pages
          }
        })
      })
  }
}

export const searchMovies = query => {
  return (dispatch, getState) => {
    axios
      .get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: apiKey,
          languange: 'en-US',
          query: query,
          page: 1,
          include_adult: false
        }
      })
      .then(({ data }) => {
        const movies = data
        dispatch({
          type: FETCH_MOVIES,
          payload: {
            movieList: movies.results,
            totalPages: movies.total_pages
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
