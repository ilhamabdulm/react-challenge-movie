import { FETCH_MOVIES } from '../actionList'

const initialState = {
  movieList: [],
  totalPages: 1,
  loading: false
}

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default movieReducer
