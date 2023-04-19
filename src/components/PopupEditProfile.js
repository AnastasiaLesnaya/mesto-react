import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupEditProfile (props) {
  return (
    < PopupWithForm
      isOpen = { props.isOpen }
      onClose = { props.onClose }
      id = 'profile-popup'
      title = 'Редактировать профиль'
      type = 'profile' >
        <label htmlFor="username-input" className="popup__label">
          <input id="username-input" type="text" className="popup__input"
                 name="username" placeholder="Введите имя" minLength="2" maxLength="40" required />
          <span className="username-input-error popup__input-error" />
        </label>
        <label htmlFor="description-input" className="popup__label">
          <input id="description-input" type="text" className="popup__input"
                 name="description" placeholder="О себе" minLength="2" maxLength="200" required />
          <span className="description-input-error popup__input-error" />
        </label>
    </PopupWithForm>
  )
}

export default PopupEditProfile;