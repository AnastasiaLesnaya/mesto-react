import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import PopupEditAvatar from './PopupEditAvatar';
import PopupEditProfile from "./PopupEditProfile";
import PopupAddCard from './PopupAddCard';

function App () {
// Редактирование профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
 // Редактирование картинки профиля
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
 // Новая карточка места
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
 // Попап зум
  const [isImageOpen, setIsImageOpen] = useState(false);
 // Удаление карточки
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
 // Попап зум
  const [selectedCard, setSelectedCard] = useState({});

  // Обработчик открытия попапа редактирования профиля
  function handleEditProfileClick () { setIsEditProfilePopupOpen(true) }
  // Обработчик открытия попапа обновления аватара
  function handleEditAvatarClick () { setIsEditAvatarPopupOpen(true) }
  // Обработчик открытия попапа добавления карточки
  function handleAddPlaceClick () { setIsAddPlacePopupOpen(true) }
  // Обработчик удаления карточки
  function handleCardDelete () { setIsDeleteOpen(true) }
  // Обработчик зума карточки
  function handleCardClick (cardItem) {
    setIsImageOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: cardItem.name,
      link: cardItem.link
    })
  }
  // Функция для закрытия всех попапов
  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageOpen(false);
    setIsDeleteOpen(false);
  }

  return (
    <div className="page">
      < Header />
      < Main
        onEditProfile = { handleEditProfileClick }
        onEditAvatar = { handleEditAvatarClick }
        onAddPlace = { handleAddPlaceClick }
        onCardClick = { handleCardClick }
        onCardDelete = { handleCardDelete } />
      < Footer />
      < PopupEditProfile
        isOpen = { isEditProfilePopupOpen }
        onClose = { closeAllPopups } />
      < PopupEditAvatar
        isOpen = { isEditAvatarPopupOpen }
        onClose = { closeAllPopups } />
      < PopupAddCard
        isOpen = { isAddPlacePopupOpen }
        onClose = { closeAllPopups } />
      < ImagePopup
        isOpen = { isImageOpen }
        onClose = { closeAllPopups }
        card = { selectedCard } />
      < PopupWithForm
        isOpen = { isDeleteOpen }
        onClose = { closeAllPopups }
        id = 'delete-card'
        title = 'Вы уверены?'
        type = 'delete-card'
        buttonText = 'Да' />
    </div>
  );
}

export default App;