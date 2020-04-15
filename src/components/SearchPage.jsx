import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieItem from './MovieItem'
import Loader from './Loader'
import useQuery from './hooks/useQuery'
import { searchMovies } from '../store/actions/moviesAction'

function SearchPage(props) {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const query = useQuery()
  const title = query.get('title')
  const movieList = useSelector(state => state.movieReducer.movieList)

  useEffect(() => {
    setLoading(true)
    dispatch(searchMovies(title))
    setTimeout(() => {
      setLoading(false)
    }, 2500)
  }, [title])

  const renderCondition = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', color: 'black' }}>
          <Loader />
          <h3>Mohon ditunggu ya kakak ...</h3>
        </div>
      )
    } else {
      return movieList.length > 0 ? (
        movieList.map(movie => <MovieItem key={movie.id} movie={movie} />)
      ) : (
        <h2>Movies not found! Try another keyword</h2>
      )
    }
  }

  return (
    <div>
      <h2 data-testid='pageTitle' style={{ textAlign: 'center', marginBottom: '30px' }}>
        Search Results
      </h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          overflowY: 'scroll',
          maxHeight: '85vh'
        }}
      >
        {renderCondition()}
      </div>
    </div>
  )
}

export default SearchPage
