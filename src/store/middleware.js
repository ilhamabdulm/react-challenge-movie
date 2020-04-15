import Swal from 'sweetalert2'

import { ADD_FAVORITES } from './actionList'

export const customMiddleware = store => next => action => {
  switch (action.type) {
    case ADD_FAVORITES:
      Swal.showLoading()
      const { favorite } = action.payload
      const { favoriteList } = store.getState().favoriteReducer
      const index = favoriteList.findIndex(el => el.id === favorite.id)
      if (index < 0) {
        setTimeout(() => {
          Swal.fire(
            'Movie Added to Favorite',
            'Please check favorites tab',
            'success'
          )
          next(action)
        }, 400)
      } else {
        Swal.fire('Sorry!', 'This already on your favorite list', 'error')
        next({ type: null })
      }
      break
    default:
      next(action)
      break
  }
}
