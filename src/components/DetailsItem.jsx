import React from 'react'
import style from '../styles/Card.module.css'
import { useDispatch, useSelector } from 'react-redux'
import addFavorites from '../store/actions/favoriteAction'

function DetailsItem(props) {
  const dispatch = useDispatch()
  const { favoriteList } = useSelector(state => state.favoriteReducer)
  const movieIndex = favoriteList.findIndex(
    el => el.id === props.movieDetails.id
  )

  return (
    <div style={{ display: 'flex', maxWidth: '95vw' }}>
      <div style={{ width: '30vw' }}>
        <img
          className={style.cardImageDetail}
          src={`https://image.tmdb.org/t/p/w500/${props.movieDetails.poster_path}`}
          alt="poster"
        ></img>
      </div>
      <div style={{ display: 'block', margin: '0 20px', width: '70vw' }}>
        <h2>
          {props.movieDetails.title}
          <span>
            <button
              data-testid="favBtn"
              className={
                movieIndex < 0 ? style.favButton : style.favButtonCheck
              }
              onClick={() => dispatch(addFavorites(props.movieDetails))}
            >
              <i className="fa fa-star"></i>
            </button>
          </span>
        </h2>
        <h4>Ratings : {props.movieDetails.vote_average}</h4>
        <h5>
          Release Date :
          {' ' + new Date(props.movieDetails.release_date).toLocaleDateString()}
        </h5>
        <p>{props.movieDetails.overview}</p>
        <p>
          <strong>Runtime</strong> : {props.movieDetails.runtime} mins
        </p>
        <h3 data-testid="castMovie">Cast :</h3>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {props.cast.map((cast, i) => {
            return (
              <div style={{ width: '70px', textAlign: 'center' }} key={i}>
                <img
                  src={`https://image.tmdb.org/t/p/w185/${cast.profile_path}`}
                  alt="profile"
                  width="50"
                  height="50"
                  style={{ borderRadius: '50%', margin: '0 10px' }}
                ></img>
                <h5>{cast.name}</h5>
              </div>
            )
          })}
        </div>
        <h5>
          Go to IMDB Page?{' '}
          <a
            href={`https://www.imdb.com/title/${props.movieDetails.imdb_id}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Click Here
          </a>
        </h5>
      </div>
      <iframe
        style={{ marginBottom: '10px', marginLeft: '20px' }}
        width="100%"
        height="396"
        src={props.videoUrl}
        title={props.movieDetails.id}
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default DetailsItem
