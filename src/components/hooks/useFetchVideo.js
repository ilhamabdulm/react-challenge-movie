import { useState, useEffect } from 'react'
import axios from 'axios'

import { apiKey } from '../../apiKey'

function useFetchVideo(movieId) {
  const [videoUrl, setUrl] = useState('')
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        params: {
          api_key: apiKey,
          languange: 'en-US'
        }
      })
      .then(({ data }) => {
        const result = data
        if (result.status_code === 34) {
          return
        }
        if (result.results.length === 0) {
          setUrl({
            videoUrl: ''
          })
        } else {
          setUrl({
            videoUrl: `https://youtube.com/embed/${result.results[0].key}`
          })
        }
      })
      .catch(error => {
        if (error.status_code === 34) {
          return
        }
      })
  }, [movieId])
  return videoUrl
}

export default useFetchVideo
