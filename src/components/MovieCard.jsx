import React from 'react'
import { Link } from 'react-router-dom'
import style from '../styles/Card.module.css'

export default props => {
  return (
    <div
      data-testid={props.movie.id}
      className={style.card}
      style={
        props.image === null
          ? {
              backgroundImage: `url(https://lh3.googleusercontent.com/proxy/7S_PWHkQiGnMCS-jb2oKEqMp2y-ggcuiCTX19eF93DmrSr_6SNp1xudvesdGHXJQUivxvfznv50rzKfs6YwIbS79XuSi-Ecm28oXJzNtUS0F5wC-7DB6gQ)`
            }
          : {
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.image})`
            }
      }
    >
      <div className={style.innerCard}>
        <h2>
          {props.movie.title} (
          {new Date(props.movie.release_date).getFullYear()})
        </h2>
        <h3>Ratings: {props.movie.vote_average}</h3>
        <Link data-testid="moreInfo" to={`/details/${props.movie.id}`}>
          More info
        </Link>
      </div>
    </div>
  )
}
