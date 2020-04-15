import React from 'react'
import style from '../styles/Nav.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import changeCategory from '../store/actions/categoryAction'

function NavButton(props) {
  const dispatch = useDispatch()

  return (
    <button className={style.btn}>
      <Link
        data-testid={props.value}
        id={props.text}
        to={`/movies/${props.value}`}
        onClick={() => dispatch(changeCategory(props.value))}
      >
        {props.text}
      </Link>
    </button>
  )
}

export default NavButton
