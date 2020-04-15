import React, { Component } from 'react'
import MovieCard from './MovieCard'

class MovieItem extends Component {
  render() {
    return this.props.movie.backdrop_path === null ? (
      <MovieCard
        image={this.props.movie.poster_path}
        movie={this.props.movie}
      />
    ) : (
      <MovieCard
        image={this.props.movie.backdrop_path}
        movie={this.props.movie}
      />
    )
  }
}

export default MovieItem
