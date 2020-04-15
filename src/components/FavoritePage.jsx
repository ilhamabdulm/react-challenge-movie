import React from 'react'
import { useSelector } from 'react-redux'
import MovieItem from './MovieItem'
import style from '../styles/List.module.css'

function FavoritePage(props) {
  const favoriteList = useSelector(state => state.favoriteReducer.favoriteList)
  const allFavorites = () => {
    return favoriteList.length === 0 ? (
      <h4>You dont have any Favorites, please select one on the Movie Page</h4>
    ) : (
      favoriteList.map(movie => <MovieItem key={movie.id} movie={movie} />)
    )
  }

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1 data-testid="pageTitle">Favorite Movies</h1>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}
      >
        <div className={style.leftContent}>{allFavorites()}</div>
      </div>
    </div>
  )
}

export default FavoritePage
