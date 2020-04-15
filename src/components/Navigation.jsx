import React, { useState, useEffect } from 'react'
import style from '../styles/Nav.module.css'
import { Link, useHistory } from 'react-router-dom'

import NavButton from './NavButton'

function Navigation(props) {
  const [searchKey, setSearchKey] = useState('')
  const history = useHistory()
  const searchMovie = e => {
    e.preventDefault()
    history.push(`/search?title=${searchKey}`)
  }

  useEffect(() => {
    if (history.location.pathname !== '/search') {
      setSearchKey('')
    }
  }, [history.location.pathname])

  return (
    <header>
      <h2>Movie Catalogue</h2>
      <ul>
        <li className={style['nav-item']}>
          <NavButton
            value="popular"
            text="Popular"
            changeCategory={props.changeCategory}
          />
        </li>
        <li className={style['nav-item']}>
          <NavButton
            value="top_rated"
            text="Top Rated"
            changeCategory={props.changeCategory}
          />
        </li>
        <li className={style['nav-item']}>
          <NavButton
            value="now_playing"
            text="Now Playing"
            changeCategory={props.changeCategory}
          />
        </li>
        <li className={style['nav-item']}>
          <NavButton
            value="upcoming"
            text="Upcoming"
            changeCategory={props.changeCategory}
          />
        </li>
        <li className={style['nav-item']}>
          <NavButton
            value="favorites"
            text="Favorites"
            changeCategory={props.changeCategory}
          />
        </li>
      </ul>
      <div>
        <form onSubmit={e => searchMovie(e)}>
          <input
            data-testid="searchInput"
            className={style.rightItem}
            style={{
              marginBottom: '20px',
              width: '300px'
            }}
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
            placeholder="Search for a movie ..."
            type="text"
          />
          <Link
            style={{
              margin: '0 5px',
              height: '35px',
              width: '80px',
              cursor: 'pointer',
              borderRadius: '5px',
              color: 'white',
              padding: '7px',
              fontWeight: '500',
              textDecoration: 'none',
              backgroundColor: 'green',
              border: 'none'
            }}
            data-testid="search"
            to={`/search?title=${searchKey}`}
          >
            Search
          </Link>
        </form>
      </div>
    </header>
  )
}

export default Navigation
