import { combineReducers } from 'redux'
import movieReducer from './movieReducer'
import favoriteReducer from './favoriteReducer'
import categoryReducer from './categoryReducer'

export default combineReducers({
  movieReducer,
  favoriteReducer,
  categoryReducer
})
