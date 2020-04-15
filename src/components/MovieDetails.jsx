import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import DetailsItem from './DetailsItem'
import useFetchVideo from './hooks/useFetchVideo'
import { useParams } from 'react-router-dom'

function MovieDetail(props) {
  const [movieDetails, setMovieDetails] = useState({})
  const [loading, setLoading] = useState(false)
  const [movieCast, setMovieCast] = useState([])
  const { id } = useParams()
  const { videoUrl } = useFetchVideo(id)

  useEffect(() => {
    setLoading(true)
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=14cc8695f2da504af9b9915e8add426c&language=en-US`
    )
      .then(res => res.json())
      .then(details => {
        setMovieDetails(details)
        return fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=14cc8695f2da504af9b9915e8add426c`
        )
      })
      .then(res => res.json())
      .then(({ cast }) => {
        if (!cast) {
          return setLoading(false)
        }
        setTimeout(() => {
          setLoading(false)
          setMovieCast(cast.slice(0, 5))
        }, 500)
      })
      .catch(error => {
        if (error.status_code === 34) {
          setLoading(false)
        }
      })
  }, [])

  return (
    <div
      style={{
        margin: '0 auto',
        padding: '40px 50px',
        display: 'flex',
        boxShadow: '2px 2px 2px 2px',
        justifyContent: 'space-around'
      }}
    >
      {loading ? (
        <Loader />
      ) : movieDetails.status_code === 34 ? (
        <div>Movie ID is unavalaible or invalid.</div>
      ) : (
        <DetailsItem
          cast={movieCast}
          movieDetails={movieDetails}
          videoUrl={videoUrl}
        />
      )}
    </div>
  )
}

export default MovieDetail
