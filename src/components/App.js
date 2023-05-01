import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupEditAvatar from './PopupEditAvatar';
import PopupEditProfile from "./PopupEditProfile";
import PopupAddCard from './PopupAddCard';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App () {
// Редактирование профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
 // Редактирование картинки профиля
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
 // Новая карточка места
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
 // Попап зум
  const [isImageOpen, setIsImageOpen] = useState(false);
 // Попап зум
  const [selectedCard, setSelectedCard] = useState({});

  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

// запрашиваем данные с сервера
 useEffect( () => {
  Promise.all([ api.getUserInfo(), api.getAllCards() ])
    .then(( [ userItem, allCards] ) => {
      setCurrentUser(userItem);
      setCards(allCards);
    })
    .catch( (err) => { console.log(`При загрузке начальных данных возникла ошибка, ${err}`) })
}, [])

  // Обработчик открытия попапа редактирования профиля
  function handleEditProfileClick () { setIsEditProfilePopupOpen(true) }
  // Обработчик открытия попапа обновления аватара
  function handleEditAvatarClick () { setIsEditAvatarPopupOpen(true) }
  // Обработчик открытия попапа добавления карточки
  function handleAddPlaceClick () { setIsAddPlacePopupOpen(true) }
  
  // Обработчик удаления карточки
  function handleCardDelete (card) {
    api.deleteCard(card._id)
      .then(() => { 
        setCards( (cardsArray) => cardsArray.filter( (cardItem) => cardItem._id !== card._id)) })
      .catch( (err) => { console.log(`При удалении карточки возникла ошибка, ${err}`) })
  }
  // Обработчик изменения аватара
  function handleUpdateAvatar (link) {
    api.setAvatar(link)
      .then( (res) => { 
        setCurrentUser(res);
        closeAllPopups() 
      })
      .catch( (err) => { console.log(`При загрузке аватара возникла ошибка, ${err}`) })
  }
  // Обработчик зума карточки
  function handleCardClick (cardItem) {
    setIsImageOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: cardItem.name,
      link: cardItem.link
    })
  }

// Обработчик лайков карточки
function handleCardLike (card) {
// Снова проверяем, есть ли уже лайк на этой карточке
  const isLiked = card.likes.some(cardItem => cardItem._id === currentUser._id);
// Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then( (cardsItem) => {
      setCards( (state) => state.map( (cardItem) => cardItem._id === card._id ? cardsItem : cardItem) )
    })
    .catch( (err) => { console.log(`При отражении лайков возникла ошибка, ${err}`) })
}

// Обработчик добавления карточки
function handleAddCard (cardItem) {
  api.addNewCard(cardItem)
    .then((card) => {
      setCards([card, ...cards]);
      closeAllPopups() 
    })
    .catch( (err) => { console.log(`Возникла ошибка при добавлении новой карточки, ${err}`) })
}

// Обработчик данных пользователя
function handleUpdateUser (currentUser) {
  api.setUserInfo(currentUser)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups()
    })
    .catch( (err) => { console.log(`При редактировании профиля возникла ошибка, ${err}`) })
}

  // Функция для закрытия всех попапов
  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageOpen(false);
  }

  return (
<CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        < Header />
        < Main
          onEditProfile = { handleEditProfileClick }
          onEditAvatar = { handleEditAvatarClick }
          onAddPlace = { handleAddPlaceClick }
          onCardClick = { handleCardClick }
          onCardDelete = { handleCardDelete }
          onCardLike = { handleCardLike }
          cards={ cards } />
        < Footer />
        < PopupEditProfile
          isOpen = { isEditProfilePopupOpen }
          onClose = { closeAllPopups }
          onUpdateUser = { handleUpdateUser }/>
          
          < PopupEditAvatar
          isOpen = { isEditAvatarPopupOpen }
          onClose = { closeAllPopups }
          onUpdateAvatar = { handleUpdateAvatar } />
        
        < PopupAddCard
          isOpen = { isAddPlacePopupOpen }
          onClose = { closeAllPopups }
          onAddPlace = { handleAddCard } />
          
        < ImagePopup
          isOpen = { isImageOpen }
          onClose = { closeAllPopups }
          card = { selectedCard } />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;