import React, {useEffect, useState} from 'react';
import api from '../utils/api';
import Card from './Card';

function Main (props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);
  // запрашиваем данные с сервера
  useEffect( () => {
    Promise.all([ api.getUserInfo(), api.getAllCards() ])
    .then(( [ userItem, AllCards] ) => {
      setUserName(userItem.name);
      setUserDescription(userItem.about);
      setUserAvatar(userItem.avatar);
      setCards(AllCards.reverse());
 })
 .catch((err) => {
   console.log(`При загрузке начальных данных возникла ошибка, ${err}`)
 })
  }, [])
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-area">
          <img src={ userAvatar } className="profile__avatar" alt="аватар профиля" />
          < button
            type="button"
            className="profile__avatar-edit"
            aria-label="Редактировать аватар профиля"
            onClick={ props.onEditAvatar } />
        </div>
        <div className="profile__container">
          <div className="profile__info">
            <h1 className="profile__name">{ userName }</h1>
            < button
            type="button"
            className="button profile__btn-edit"
            aria-label="Редактировать профиль"
            onClick={ props.onEditProfile } />
            </div>
            <p className="profile__description">{ userDescription }</p>
        </div>
        < button
          type="button"
          className="button profile__btn-add"
          aria-label="Добавить место"
          onClick={ props.onAddPlace } />
      </section>
      <section className="cards">
        { cards.map( (cardItem) => (
          < Card
            key = { cardItem._id }
            link = { cardItem.link }
            name = { cardItem.name }
            likeCount = { cardItem.likes.length }
            onCardClick = { props.onCardClick }
            onCardDelete = { props.onCardDelete }
            card = { cardItem } />
        )) }
      </section>
    </main>
  )
}

export default Main;