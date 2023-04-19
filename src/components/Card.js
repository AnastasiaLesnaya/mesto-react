import React from 'react';

function Card (props) {
  // функции зума и удаления картинки
  function handleClick () { props.onCardClick(props.card) }
  function handleDelete () { props.onCardDelete(props.card) }

  return (
    <div className="cards__item">
      <button className="button cards__btn-delete" onClick={ handleDelete } type="button" aria-label="delete" />
      <img src={ props.link } className="cards__image button cards__btn-zoom" onClick={ handleClick } alt={ props.name } />
      <div className="cards__info">
        <h2 className="cards__title">{ props.name }</h2>
        <div className="cards__like-area">
          <button type="button" className="cards__btn-like button" aria-label="like" />
          <p className="cards__like-counter">{ props.likeCount > 0 ? props.likeCount : null }</p>
        </div>
      </div>
    </div>
  )
}

export default Card;