import { CHANGE_CATEGORY } from '../actionList'

const changeCategory = category => {
  let pageName
  if (category === 'popular') {
    pageName = 'Popular'
  } else if (category === 'top_rated') {
    pageName = 'Top Rated'
  } else if (category === 'now_playing') {
    pageName = 'Now Playing'
  } else if (category === 'upcoming') {
    pageName = 'Upcoming'
  } else {
    pageName = 'Search'
  }

  return {
    type: CHANGE_CATEGORY,
    payload: {
      activeCategory: category,
      activePage: pageName
    }
  }
}

export default changeCategory
