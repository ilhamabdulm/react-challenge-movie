import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers'
import { customMiddleware } from './middleware'

const middlewares = applyMiddleware(thunk, customMiddleware)

const store = createStore(reducer, middlewares)

export default store
