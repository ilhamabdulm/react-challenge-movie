import React from 'react'
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails'
import Navigation from './components/Navigation'
import ErrorPage from './components/ErrorPage'
import SearchPage from './components/SearchPage'
import store from './store'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'
import './styles/App.css'
import FavoritePage from './components/FavoritePage'

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <div id="app" style={{ height: '80vh' }}>
          <Navigation />
          <Switch>
            <Route path="/movies/favorites" component={FavoritePage} />
            <Route
              exact
              path="/movies/:category"
              render={props => <MovieList {...props} />}
            ></Route>
            <Route exact path="/search">
              <SearchPage />
            </Route>
            <Route exact path="/details/:id" component={MovieDetails} />
            <Route exact path="/">
              <Redirect to="/movies/popular" />
            </Route>
            <Route>
              <ErrorPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
