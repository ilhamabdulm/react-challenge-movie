import React from 'react'
import style from '../styles/Pagination.module.css'

export default props => {
  return (
    <div
      id="text"
      style={{ textAlign: 'center', width: '70%', marginBottom: '10px' }}
    >
      {props.activePage === '' ? (
        <h2>Popular Movies</h2>
      ) : (
        <h2 data-testid="pageTitle">{props.activePage} Movies</h2>
      )}
      <div className={style.pagination}>
        <span
          data-testid="paginationBack"
          onClick={() => props.changeCurrentPage('prev')}
        >
          &laquo;
        </span>
        {props.totalPages > 10
          ? Array.from(Array(10), (el, i) => {
              return (
                <span data-testid={`pagination${i+1}`} key={i} onClick={() => props.getMoviePage(i + 1)}>
                  {i + 1}
                </span>
              )
            })
          : Array.from(Array(props.totalPages), (el, i) => {
              return (
                <span data-testid={`pagination${i+1}`} key={i} onClick={() => props.getMoviePage(i + 1)}>
                  {i + 1}
                </span>
              )
            })}
        <span data-testid="paginationNext" onClick={() => props.changeCurrentPage('next')}>&raquo;</span>
      </div>
      <input
        style={{
          margin: '10px auto',
          width: '300px',
          height: '20px',
          textAlign: 'center',
          display: 'block'
        }}
        data-testid="searchBar"
        value={props.searchKey}
        placeholder="Filter movie ..."
        onChange={e => props.setSearchKey(e.target.value)}
        type="text"
      />
    </div>
  )
}
