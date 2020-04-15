import React, { useState, useEffect } from 'react'
import { withRouter, useParams } from 'react-router-dom'
import style from '../styles/List.module.css'
import { useSelector, useDispatch } from 'react-redux'

import MovieItem from './MovieItem'
import Loader from './Loader'
import PageTitle from './PageTitle'
import { fetchMovies } from '../store/actions/moviesAction'
import changeCategory from '../store/actions/categoryAction'

function MovieList(props) {
  const [loading, setLoading] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const { category } = useParams()

  const dispatch = useDispatch()
  const movieList = useSelector(state => state.movieReducer.movieList)
  const totalPages = useSelector(state => state.movieReducer.totalPages)
  const activeCategory = useSelector(
    state => state.categoryReducer.activeCategory
  )
  const activePage = useSelector(state => state.categoryReducer.activePage)

  useEffect(() => {
    setLoading(true)
    dispatch(fetchMovies(1, category))
    dispatch(changeCategory(category))
    setTimeout(() => {
      setLoading(false)
    }, 900)
  }, [category])

  const changeCurrentPage = action => {
    var newPage = null
    if (action === 'next' && currentPage < totalPages) {
      newPage = currentPage + 1
      setCurrentPage(newPage)
    } else if (action === 'prev' && currentPage > 1) {
      newPage = currentPage - 1
      setCurrentPage(newPage)
    }
    dispatch(fetchMovies(currentPage, activeCategory))
  }

  const getMoviePage = page => {
    setLoading(true)
    dispatch(fetchMovies(page, category))
    setTimeout(() => {
      setLoading(false)
    }, 700)
  }

  const filteredMovies = () => {
    let newList = movieList.filter(movie =>
      movie.title.toLowerCase().includes(searchKey.toLowerCase())
    )
    return newList.map(movie => <MovieItem key={movie.id} movie={movie} />)
  }

  const allMovies = () => {
    return movieList.map(movie => <MovieItem key={movie.id} movie={movie} />)
  }

  const renderCondition = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', color: 'black' }}>
          <Loader />
          <h3>Mohon ditunggu ya kakak ...</h3>
        </div>
      )
    } else if (searchKey.length > 0) {
      return filteredMovies()
    } else {
      return allMovies()
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}
      >
        <PageTitle
          activePage={activePage}
          totalPages={totalPages}
          getMoviePage={getMoviePage}
          changeCurrentPage={changeCurrentPage}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        <div className={style.leftContent}>{renderCondition()}</div>
      </div>
    </div>
  )
}

export default withRouter(MovieList)
