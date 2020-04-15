import React, { Component } from 'react'
import style from '../styles/Loader.module.css'

class Loader extends Component {
  render() {
    return (
      <div className={style.ldsSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
}

export default Loader
