import { CHANGE_CATEGORY } from '../actionList'

const initialState = {
  activeCategory: null,
  activePage: null
}

const changeCategory = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default changeCategory
