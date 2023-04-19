import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupAddCard (props) {
  return (
    < PopupWithForm
      isOpen = { props.isOpen }
      onClose = { props.onClose }
      id = 'cards-popup'
      title = 'Новое место'
      type = 'mesto'
      buttonText = 'Добавить' >
        <label htmlFor="place-name-input" className="popup__label">
          <input id="place-name-input" type="text" className="popup__input"
                 name="placename" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="place-name-input-error popup__input-error" />
        </label>
        <label htmlFor="place-image-input" className="popup__label">
          <input id="place-image-input" type="url" className="popup__input"
                 name="placeimage" placeholder="Ссылка на картинку" required />
          <span className="place-image-input-error popup__input-error" />
        </label>
    </PopupWithForm>
  )
}

export default PopupAddCard;