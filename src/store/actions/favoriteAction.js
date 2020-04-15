import { ADD_FAVORITES } from '../actionList'

const addFavorites = movie => {
  return {
    type: ADD_FAVORITES,
    payload: {
      favorite: movie
    }
  }
}

export default addFavorites
