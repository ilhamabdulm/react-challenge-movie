import { ADD_FAVORITES } from '../actionList'

const initialState = {
  favoriteList: []
}

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITES:
      return {
        ...state,
        favoriteList: [...state.favoriteList, action.payload.favorite]
      }
    default:
      return state
  }
}

export default favoriteReducer
